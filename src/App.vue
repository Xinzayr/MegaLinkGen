<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <RouterView />
  </div>
</template>

<script setup>
import { registerSW } from 'virtual:pwa-register'
import { onMounted } from 'vue'
import { useHistoryStore } from './stores/history'

const historyStore = useHistoryStore()

onMounted(() => {
  // Load history on app mount
  historyStore.loadHistory()

  // Register service worker
  if ('serviceWorker' in navigator) {
    registerSW({
      onNeedRefresh() {
        console.log('New content available, please refresh.')
      },
      onOfflineReady() {
        console.log('App ready to work offline')
      },
    })
  }
})
</script>
