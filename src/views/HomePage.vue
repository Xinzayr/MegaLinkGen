<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <!-- PWA Install Prompt -->
    <div
      v-if="showInstallPrompt"
      class="bg-primary-700 text-white py-3 px-4"
    >
      <div class="container mx-auto flex items-center justify-between">
        <p class="text-sm">{{ t('install.prompt') }}</p>
        <div class="flex space-x-2">
          <button
            @click="installPWA"
            class="bg-white text-primary-700 px-4 py-1 rounded text-sm font-medium hover:bg-gray-100"
          >
            {{ t('install.button') }}
          </button>
          <button
            @click="dismissInstall"
            class="text-white hover:text-gray-200 text-sm"
          >
            {{ t('install.dismiss') }}
          </button>
        </div>
      </div>
    </div>

    <main class="flex-1">
      <div class="container mx-auto px-4 py-8">
        <!-- Link Input -->
        <div class="max-w-3xl mx-auto mb-8">
          <LinkInput />
        </div>

        <!-- Results -->
        <div class="max-w-3xl mx-auto mb-8">
          <ResultsDisplay />
        </div>

        <!-- History -->
        <div class="max-w-3xl mx-auto mb-8">
          <HistoryPanel />
        </div>

        <!-- Features -->
        <div class="max-w-5xl mx-auto">
          <FeaturesGrid />
        </div>
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '../components/AppFooter.vue'
import AppHeader from '../components/AppHeader.vue'
import FeaturesGrid from '../components/FeaturesGrid.vue'
import HistoryPanel from '../components/HistoryPanel.vue'
import LinkInput from '../components/LinkInput.vue'
import ResultsDisplay from '../components/ResultsDisplay.vue'

const { t } = useI18n()

const showInstallPrompt = ref(false)
let deferredPrompt = null

const handleBeforeInstallPrompt = (e) => {
  e.preventDefault()
  deferredPrompt = e
  showInstallPrompt.value = true
}

const installPWA = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  const { outcome } = await deferredPrompt.userChoice

  if (outcome === 'accepted') {
    console.log('PWA installed')
  }

  deferredPrompt = null
  showInstallPrompt.value = false
}

const dismissInstall = () => {
  showInstallPrompt.value = false
  deferredPrompt = null
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})

onUnmounted(() => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
})
</script>
