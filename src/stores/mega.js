import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useMegaStore = defineStore('mega', () => {
    // State
    const megaUrl = ref('')
    const multiLinkMode = ref(false)
    const multiLinkUrls = ref('')
    const fileInfo = ref(null)
    const multiLinkResults = ref([])
    const directLink = ref('')
    const loading = ref(false)
    const error = ref('')
    const isDownloading = ref(false)
    const linkStatus = ref('unknown')
    const linkTesting = ref(false)
    const qrCode = ref(null)
    const developerMode = ref(false)
    const devInfo = ref(null)
    const rateLimitCooldown = ref(0)
    const rateLimitProgress = ref(0)
    const isDragging = ref(false)

    // Constants
    const API_ENDPOINT = 'https://api.mega.nz/cs'
    const API_TIMEOUT = 15000
    const RATE_LIMIT_DURATION = 30000

    // Computed
    const isValidMegaUrl = computed(() => {
        if (!megaUrl.value) return false
        const patterns = [
            /^https?:\/\/(www\.)?mega\.nz\/file\/[A-Za-z0-9_-]+#[A-Za-z0-9_-]+$/,
            /^https?:\/\/(www\.)?mega\.co\.nz\/#![A-Za-z0-9_-]+![A-Za-z0-9_-]+$/
        ]
        return patterns.some(pattern => pattern.test(megaUrl.value))
    })

    const isFolderUrl = computed(() => {
        if (!megaUrl.value) return false
        return megaUrl.value.includes('/folder/') || megaUrl.value.includes('#F!')
    })

    const formattedFileSize = computed(() => {
        if (!fileInfo.value?.size) return { value: '0', unit: 'B' }
        const bytes = fileInfo.value.size
        const units = ['B', 'KB', 'MB', 'GB', 'TB']
        let size = bytes
        let unitIndex = 0
        while (size >= 1024 && unitIndex < units.length - 1) {
            size /= 1024
            unitIndex++
        }
        return {
            value: size.toFixed(2),
            unit: units[unitIndex]
        }
    })

    const fileType = computed(() => {
        if (!fileInfo.value?.name) return 'unknown'
        const ext = fileInfo.value.name.split('.').pop()?.toLowerCase()
        const types = {
            video: ['mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm'],
            audio: ['mp3', 'wav', 'flac', 'aac', 'ogg', 'm4a'],
            image: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'],
            document: ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'],
            archive: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
            code: ['js', 'py', 'java', 'cpp', 'html', 'css', 'json']
        }
        for (const [type, extensions] of Object.entries(types)) {
            if (extensions.includes(ext)) return type
        }
        return 'file'
    })

    // Methods
    const clearInput = () => {
        megaUrl.value = ''
        error.value = ''
        fileInfo.value = null
        directLink.value = ''
        linkStatus.value = 'unknown'
        qrCode.value = null
    }

    const clearError = () => {
        error.value = ''
    }

    const detectLinkType = (url) => {
        if (!url) return 'invalid'
        if (url.includes('/folder/') || url.includes('#F!')) return 'folder'
        if (url.includes('/file/') || url.includes('#!')) return 'file'
        return 'invalid'
    }

    const validateUrl = (url) => {
        const type = detectLinkType(url)
        if (type === 'invalid') {
            return { valid: false, message: 'errors.invalidUrl' }
        }
        if (type === 'folder') {
            return { valid: false, message: 'errors.folderNotSupported' }
        }
        return { valid: true, message: '' }
    }

    return {
        // State
        megaUrl,
        multiLinkMode,
        multiLinkUrls,
        fileInfo,
        multiLinkResults,
        directLink,
        loading,
        error,
        isDownloading,
        linkStatus,
        linkTesting,
        qrCode,
        developerMode,
        devInfo,
        rateLimitCooldown,
        rateLimitProgress,
        isDragging,
        // Constants
        API_ENDPOINT,
        API_TIMEOUT,
        RATE_LIMIT_DURATION,
        // Computed
        isValidMegaUrl,
        isFolderUrl,
        formattedFileSize,
        fileType,
        // Methods
        clearInput,
        clearError,
        detectLinkType,
        validateUrl
    }
})
