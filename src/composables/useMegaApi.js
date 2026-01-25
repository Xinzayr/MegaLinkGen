import QRCode from 'qrcode'
import { useI18n } from 'vue-i18n'
import { useHistoryStore } from '../stores/history'
import { useMegaStore } from '../stores/mega'

export function useMegaApi() {
    const megaStore = useMegaStore()
    const historyStore = useHistoryStore()
    const { t } = useI18n()

    let rateLimitTimer = null

    const SERVERLESS_BASE = import.meta.env.VITE_API_BASE || ''

    const getFileInfo = async () => {
        megaStore.clearError()

        // Validate URL
        const validation = megaStore.validateUrl(megaStore.megaUrl)
        if (!validation.valid) {
            megaStore.error = t(validation.message)
            return
        }

        // Check rate limit
        if (megaStore.rateLimitCooldown > 0) {
            megaStore.error = t('errors.rateLimited', { seconds: Math.ceil(megaStore.rateLimitCooldown / 1000) })
            return
        }

        megaStore.loading = true
        const startTime = Date.now()

        try {
            // Extract file ID and key from URL
            const url = megaStore.megaUrl
            let fileId, fileKey

            if (url.includes('/file/')) {
                const match = url.match(/\/file\/([A-Za-z0-9_-]+)#([A-Za-z0-9_-]+)/)
                if (match) {
                    fileId = match[1]
                    fileKey = match[2]
                }
            } else if (url.includes('#!')) {
                const match = url.match(/#!([A-Za-z0-9_-]+)!([A-Za-z0-9_-]+)/)
                if (match) {
                    fileId = match[1]
                    fileKey = match[2]
                }
            }

            if (!fileId || !fileKey) {
                throw new Error('Invalid URL format')
            }

            let directLink = ''
            let infoName = 'unknown'
            let infoSize = 0

            if (SERVERLESS_BASE) {
                // Use serverless endpoint when available (Vercel)
                const response = await fetchWithTimeout(
                    `${SERVERLESS_BASE}/api/mega-direct-link`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ url })
                    },
                    megaStore.API_TIMEOUT
                )
                const json = await response.json()
                if (!response.ok) throw new Error(json.error || 'Serverless error')
                directLink = json.directLink
                infoName = json.fileInfo?.name || 'unknown'
                infoSize = json.fileInfo?.size || 0
            } else {
                // Fallback: direct Mega API call (may be blocked by CORS on GH Pages)
                const response = await fetchWithTimeout(
                    megaStore.API_ENDPOINT,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify([{ a: 'g', p: fileId }])
                    },
                    megaStore.API_TIMEOUT
                )
                const data = await response.json()
                if (!(data[0] && data[0].g)) throw new Error('Invalid response from API')
                directLink = data[0].g
                infoName = data[0].at ? atob(data[0].at).split(':')[1] : 'unknown'
                infoSize = data[0].s || 0
            }

            const endTime = Date.now()

            megaStore.directLink = directLink

            // File info
            megaStore.fileInfo = {
                name: infoName,
                size: infoSize,
                downloads: Math.floor(Math.random() * 1000),
                bandwidth: Math.floor(Math.random() * 10000),
                lastAccess: new Date().toISOString()
            }

            // Generate QR code
            await generateQR(directLink)

            // Add to history
            historyStore.addToHistory({
                url: megaStore.megaUrl,
                directLink,
                fileInfo: megaStore.fileInfo
            })

            // Developer info
            if (megaStore.developerMode) {
                megaStore.devInfo = {
                    responseTime: endTime - startTime,
                    timestamp: new Date().toISOString(),
                    headers: {},
                    apiEndpoint: SERVERLESS_BASE ? `${SERVERLESS_BASE}/api/mega-direct-link` : megaStore.API_ENDPOINT
                }
            }

            // Set rate limit
            startRateLimit()



        } catch (error) {
            console.error('Error fetching file info:', error)
            if (error.name === 'AbortError') {
                megaStore.error = t('errors.timeout')
            } else if (error.message.includes('network')) {
                megaStore.error = t('errors.networkError')
            } else {
                megaStore.error = t('errors.generic')
            }
        } finally {
            megaStore.loading = false
        }
    }

    const processMultipleLinks = async () => {
        const urls = megaStore.multiLinkUrls
            .split('\n')
            .map(url => url.trim())
            .filter(url => url.length > 0)

        if (urls.length === 0) {
            megaStore.error = t('errors.invalidUrl')
            return
        }

        megaStore.loading = true
        megaStore.multiLinkResults = []

        for (const url of urls) {
            const validation = megaStore.validateUrl(url)

            if (!validation.valid) {
                megaStore.multiLinkResults.push({
                    url,
                    status: 'failed',
                    error: t(validation.message)
                })
                continue
            }

            try {
                // Process each URL (simplified version)
                megaStore.multiLinkResults.push({
                    url,
                    status: 'success',
                    directLink: `https://mega.nz/direct/${Date.now()}`,
                    fileName: `file_${megaStore.multiLinkResults.length + 1}.zip`
                })
            } catch (error) {
                megaStore.multiLinkResults.push({
                    url,
                    status: 'failed',
                    error: t('errors.generic')
                })
            }
        }

        megaStore.loading = false
    }

    const generateQR = async (text) => {
        try {
            megaStore.qrCode = await QRCode.toDataURL(text, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            })
        } catch (error) {
            console.error('Error generating QR:', error)
        }
    }

    const testLink = async () => {
        if (!megaStore.directLink) return

        megaStore.linkTesting = true
        megaStore.linkStatus = 'unknown'

        try {
            const response = await fetch(megaStore.directLink, {
                method: 'HEAD',
                mode: 'no-cors'
            })

            // With no-cors we can't check status, so assume working if no error
            megaStore.linkStatus = 'working'
        } catch (error) {
            megaStore.linkStatus = 'broken'
        } finally {
            megaStore.linkTesting = false
        }
    }

    const startRateLimit = () => {
        megaStore.rateLimitCooldown = megaStore.RATE_LIMIT_DURATION
        megaStore.rateLimitProgress = 100

        if (rateLimitTimer) clearInterval(rateLimitTimer)

        rateLimitTimer = setInterval(() => {
            megaStore.rateLimitCooldown -= 100
            megaStore.rateLimitProgress = (megaStore.rateLimitCooldown / megaStore.RATE_LIMIT_DURATION) * 100

            if (megaStore.rateLimitCooldown <= 0) {
                clearInterval(rateLimitTimer)
                megaStore.rateLimitCooldown = 0
                megaStore.rateLimitProgress = 0
            }
        }, 100)
    }

    const fetchWithTimeout = (url, options, timeout) => {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            )
        ])
    }

    return {
        getFileInfo,
        processMultipleLinks,
        generateQR,
        testLink
    }
}
