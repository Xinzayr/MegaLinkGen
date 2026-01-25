import { useMegaStore } from '../stores/mega'

export function useClipboard() {
    const megaStore = useMegaStore()

    const copyToClipboard = async (text) => {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text)
                return true
            } else {
                // Fallback for older browsers or insecure contexts
                const textArea = document.createElement('textarea')
                textArea.value = text
                textArea.style.position = 'fixed'
                textArea.style.left = '-999999px'
                textArea.style.top = '-999999px'
                document.body.appendChild(textArea)
                textArea.focus()
                textArea.select()
                const success = document.execCommand('copy')
                textArea.remove()
                return success
            }
        } catch (error) {
            console.error('Failed to copy:', error)
            return false
        }
    }

    return {
        copyToClipboard
    }
}

export function useDownload() {
    const megaStore = useMegaStore()

    const downloadFile = (url) => {
        if (!url) {
            console.error('No URL provided for download')
            return
        }

        try {
            // Simple redirect like the original - browser handles the download
            megaStore.isDownloading = true

            setTimeout(() => {
                window.location.href = url
                // Reset after delay to handle cases where user cancels
                setTimeout(() => {
                    megaStore.isDownloading = false
                }, 5000)
            }, 500)
        } catch (error) {
            console.error('Download failed:', error)
            megaStore.isDownloading = false
            // Fallback
            window.open(url, '_blank')
        }
    }

    const downloadQR = (dataUrl, filename = 'qrcode.png') => {
        try {
            const link = document.createElement('a')
            link.href = dataUrl
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error('QR download failed:', error)
        }
    }

    return {
        downloadFile,
        downloadQR
    }
}

export function useDragDrop() {
    const megaStore = useMegaStore()

    const handleDragOver = (event) => {
        event.preventDefault()
        megaStore.isDragging = true
    }

    const handleDragLeave = (event) => {
        event.preventDefault()
        megaStore.isDragging = false
    }

    const handleDrop = async (event) => {
        event.preventDefault()
        megaStore.isDragging = false

        const items = event.dataTransfer.items
        const urls = []

        for (let i = 0; i < items.length; i++) {
            if (items[i].kind === 'string' && items[i].type === 'text/plain') {
                const text = await new Promise((resolve) => {
                    items[i].getAsString(resolve)
                })

                // Extract Mega URLs from text
                const megaUrlPattern = /https?:\/\/(www\.)?(mega\.nz|mega\.co\.nz)\/(file|folder)\/[A-Za-z0-9_#!-]+/g
                const matches = text.match(megaUrlPattern)
                if (matches) {
                    urls.push(...matches)
                }
            }
        }

        if (urls.length > 0) {
            if (urls.length === 1) {
                megaStore.megaUrl = urls[0]
                megaStore.multiLinkMode = false
            } else {
                megaStore.multiLinkUrls = urls.join('\n')
                megaStore.multiLinkMode = true
            }
        }
    }

    return {
        handleDragOver,
        handleDragLeave,
        handleDrop
    }
}
