<template>
  <section class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4" aria-label="Features">
    <div class="glass rounded-lg p-4 text-center hover:border-blue-500/50 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-blue-500 mb-2" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
      <h3 class="font-semibold text-white mb-1">Secure</h3>
      <p class="text-xs text-neutral-400">All connections are encrypted</p>
    </div>
    <div class="glass rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-purple-500 mb-2" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
      <h3 class="font-semibold text-white mb-1">Lightning Fast</h3>
      <p class="text-xs text-neutral-400">Instant link generation</p>
    </div>
    <div class="glass rounded-lg p-4 text-center hover:border-green-500/50 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-green-500 mb-2" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <h3 class="font-semibold text-white mb-1">Privacy First</h3>
      <p class="text-xs text-neutral-400">No data stored or tracked</p>
    </div>
  </section>
</template>

<script setup>
// Diseño puramente visual, sin i18n aquí para fidelidad al mock
</script>
