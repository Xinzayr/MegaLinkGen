<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <script setup>
    import { registerSW } from 'virtual:pwa-register'
    import { onMounted } from 'vue'
    import { useHistoryStore } from './stores/history'

    const historyStore = useHistoryStore()

    onMounted(() => {
      // Load history on app mount
      historyStore.loadHistory()

      // Initialize Microsoft Clarity
      if (typeof window !== 'undefined' && !window.clarity) {
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "v70yix17wh");
      }

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
    })
  }
})
</script>
