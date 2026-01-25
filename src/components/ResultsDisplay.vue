<template>
  <div v-if="fileInfo && directLink" class="card">
    <h2 class="text-xl font-bold text-gray-900 mb-4">{{ t('results.title') }}</h2>

    <div class="space-y-4">
      <!-- File Info -->
      <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <span class="text-2xl">{{ getFileIcon(fileType) }}</span>
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">{{ fileInfo.name }}</p>
          <p class="text-sm text-gray-500">
            {{ formattedFileSize.value }} {{ formattedFileSize.unit }}
          </p>
        </div>
        <div class="flex-shrink-0">
          <span :class="[
            'px-2 py-1 text-xs font-medium rounded',
            fileType === 'video' ? 'bg-purple-100 text-purple-800' :
            fileType === 'audio' ? 'bg-blue-100 text-blue-800' :
            fileType === 'image' ? 'bg-green-100 text-green-800' :
            fileType === 'document' ? 'bg-yellow-100 text-yellow-800' :
            fileType === 'archive' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          ]">
            {{ fileType }}
          </span>
        </div>
      </div>

      <!-- Direct Link -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ t('results.directLink') }}
        </label>
        <div class="flex space-x-2">
          <input
            :value="directLink"
            readonly
            class="input-base flex-1 bg-gray-50 font-mono text-sm"
          />
          <button
            @click="copy"
            class="btn-secondary whitespace-nowrap"
          >
            {{ copyStatus ? t('buttons.copied') : t('buttons.copy') }}
          </button>
          <button
            @click="test"
            :disabled="linkTesting"
            class="btn-secondary whitespace-nowrap"
          >
            {{ linkTesting ? t('buttons.testing') : t('buttons.testLink') }}
          </button>
        </div>

        <!-- Link Status -->
        <div v-if="linkStatus !== 'unknown'" class="mt-2 flex items-center space-x-2">
          <span :class="[
            'inline-flex items-center px-2 py-1 rounded text-xs font-medium',
            linkStatus === 'working' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          ]">
            <span class="mr-1">{{ linkStatus === 'working' ? '✓' : '✗' }}</span>
            {{ t(`results.${linkStatus}`) }}
          </span>
        </div>
      </div>

      <!-- QR Code -->
      <div v-if="qrCode" class="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
        <p class="text-sm font-medium text-gray-700 mb-3">{{ t('results.qrCode') }}</p>
        <img :src="qrCode" alt="QR Code" class="w-64 h-64 border-4 border-white shadow-sm rounded-lg" />
        <button
          @click="downloadQRCode"
          class="mt-3 btn-secondary text-sm"
        >
          {{ t('buttons.downloadQR') }}
        </button>
      </div>

      <!-- Download Button -->
      <button
        @click="download"
        class="w-full btn-primary py-3 text-lg"
      >
        <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
        </svg>
        {{ t('buttons.download') }}
      </button>

      <!-- Developer Info -->
      <div v-if="developerMode && devInfo" class="p-4 bg-gray-900 text-gray-100 rounded-lg text-xs font-mono">
        <p class="font-bold mb-2 text-green-400">{{ t('developer.mode') }}</p>
        <div class="space-y-1">
          <p><span class="text-gray-400">{{ t('developer.responseTime') }}:</span> {{ devInfo.responseTime }}ms</p>
          <p><span class="text-gray-400">{{ t('developer.timestamp') }}:</span> {{ devInfo.timestamp }}</p>
          <p><span class="text-gray-400">{{ t('developer.apiCall') }}:</span> {{ devInfo.apiEndpoint }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Multi-link Results -->
  <div v-if="multiLinkResults.length > 0" class="card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ t('multiLink.title') }}</h2>
      <button @click="exportResults" class="btn-secondary text-sm">
        {{ t('buttons.export') }}
      </button>
    </div>

    <div class="space-y-2">
      <div
        v-for="(result, index) in multiLinkResults"
        :key="index"
        class="p-3 border rounded-lg"
        :class="result.status === 'success' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'"
      >
        <div class="flex items-start justify-between">
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium truncate" :class="result.status === 'success' ? 'text-green-900' : 'text-red-900'">
              {{ result.fileName || result.url }}
            </p>
            <p class="text-xs mt-1" :class="result.status === 'success' ? 'text-green-700' : 'text-red-700'">
              {{ result.error || result.directLink }}
            </p>
          </div>
          <span :class="[
            'px-2 py-1 text-xs font-medium rounded ml-2',
            result.status === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          ]">
            {{ result.status }}
          </span>
        </div>
      </div>
    </div>

    <div class="mt-4 flex justify-between text-sm text-gray-600">
      <span>{{ t('multiLink.processed') }}: {{ multiLinkResults.length }}</span>
      <span>{{ t('multiLink.success') }}: {{ successCount }}</span>
      <span>{{ t('multiLink.failed') }}: {{ failedCount }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMegaApi } from '../composables/useMegaApi'
import { useClipboard, useDownload } from '../composables/useUtils'
import { useMegaStore } from '../stores/mega'

const { t } = useI18n()
const megaStore = useMegaStore()
const { testLink } = useMegaApi()
const { copyToClipboard } = useClipboard()
const { downloadFile, downloadQR } = useDownload()

const copyStatus = ref(false)

const fileInfo = computed(() => megaStore.fileInfo)
const directLink = computed(() => megaStore.directLink)
const qrCode = computed(() => megaStore.qrCode)
const linkStatus = computed(() => megaStore.linkStatus)
const linkTesting = computed(() => megaStore.linkTesting)
const developerMode = computed(() => megaStore.developerMode)
const devInfo = computed(() => megaStore.devInfo)
const multiLinkResults = computed(() => megaStore.multiLinkResults)
const fileType = computed(() => megaStore.fileType)
const formattedFileSize = computed(() => megaStore.formattedFileSize)

const successCount = computed(() =>
  multiLinkResults.value.filter(r => r.status === 'success').length
)

const failedCount = computed(() =>
  multiLinkResults.value.filter(r => r.status === 'failed').length
)

const getFileIcon = (type) => {
  const icons = {
    video: '🎬',
    audio: '🎵',
    image: '🖼️',
    document: '📄',
    archive: '📦',
    code: '💻',
    unknown: '📁'
  }
  return icons[type] || icons.unknown
}

const copy = async () => {
  const success = await copyToClipboard(directLink.value)
  if (success) {
    copyStatus.value = true
    setTimeout(() => {
      copyStatus.value = false
    }, 2000)
  }
}

const test = () => {
  testLink()
}

const download = () => {
  downloadFile(directLink.value, fileInfo.value?.name || 'download')
}

const downloadQRCode = () => {
  downloadQR(qrCode.value, `qr-${fileInfo.value?.name || 'code'}.png`)
}

const exportResults = () => {
  const json = JSON.stringify(multiLinkResults.value, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  downloadFile(url, 'mega-links-results.json')
  URL.revokeObjectURL(url)
}
</script>
