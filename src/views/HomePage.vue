<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />

    <!-- Main Content Area -->
    <main class="flex-1 flex items-center justify-center p-4 py-8 md:py-12">
      <div class="w-full max-w-2xl space-y-8">
        <!-- Header Section (visual) -->
        <header class="text-center space-y-4">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full animate-pulse"></div>
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="relative mx-auto text-red-500 mb-4" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
          </div>
          <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Mega Direct Link Generator
          </h1>
          <p class="mt-3 text-base md:text-lg text-neutral-400 max-w-xl mx-auto">
            {{ t('app.subtitle') }}
          </p>
        </header>

        <!-- Link Input -->
        <LinkInput />

        <!-- Results -->
        <ResultsDisplay />

        <!-- Features (when no results) -->
        <FeaturesGrid />
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
