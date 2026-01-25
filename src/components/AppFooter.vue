<template>
  <footer class="w-full text-center p-6 text-neutral-600 text-sm border-t border-neutral-800 bg-neutral-900/50 mt-12">
    <div class="max-w-3xl mx-auto space-y-3">
      <!-- Disclaimer -->
      <p class="text-xs text-neutral-700">
        {{ t('footer.disclaimer') }}
      </p>

      <!-- Made with & Powered by lines -->
      <div class="space-y-2">
        <!-- Made with by Xinzaýr -->
        <p class="flex items-center justify-center gap-2 flex-wrap">
          <span class="text-neutral-500">{{ t('footer.madeWith') }}</span>
          <span aria-hidden="true">❤️</span>
          <span class="text-neutral-500">{{ t('footer.by') }}</span>
          <a
            href="https://github.com/Xinzayr"
            target="_blank"
            rel="noopener noreferrer"
            class="text-red-500 hover:text-red-400 transition-colors font-semibold hover:underline"
          >
            Xinzaýr
          </a>
        </p>

        <!-- Powered by GitHub Copilot -->
        <p class="flex items-center justify-center gap-2 flex-wrap">
          <span class="text-neutral-500">{{ t('footer.poweredBy') }}</span>
          <a
            href="https://github.com/features/copilot"
            target="_blank"
            rel="noopener noreferrer"
            class="text-blue-400 hover:text-blue-300 transition-colors font-semibold hover:underline"
          >
            {{ t('footer.githubCopilot') }}
          </a>
        </p>
      </div>

      <!-- Deployment badge & version links -->
      <div class="flex items-center justify-center gap-3 flex-wrap pt-2">
        <!-- Deployment Badge -->
        <span
          :class="{
            'bg-gray-700 text-gray-200': deploymentType === 'unknown',
            'bg-gray-800 text-gray-300 border border-gray-600': deploymentType === 'gh-pages',
            'bg-black text-white border border-gray-700': deploymentType === 'vercel'
          }"
          class="px-2 py-1 rounded text-xs font-mono font-semibold"
        >
          {{ deploymentBadgeText }}
        </span>

        <!-- Version selection -->
        <span class="text-neutral-600 text-xs">{{ t('footer.versions') }}:</span>
        <div class="flex gap-2">
          <a
            href="https://xinzayr.github.io/MegaLinkGen/"
            target="_blank"
            rel="noopener noreferrer"
            :class="{
              'ring-1 ring-offset-2 ring-offset-neutral-900 ring-red-500': deploymentType === 'gh-pages'
            }"
            class="text-neutral-400 hover:text-neutral-300 transition-colors text-xs hover:underline"
          >
            📄 Pages
          </a>
          <span class="text-neutral-700">/</span>
          <a
            href="https://megalinkgen.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            :class="{
              'ring-1 ring-offset-2 ring-offset-neutral-900 ring-red-500': deploymentType === 'vercel'
            }"
            class="text-neutral-400 hover:text-neutral-300 transition-colors text-xs hover:underline"
          >
            ⚡ Vercel
          </a>
        </div>
      </div>

      <!-- Version info -->
      <p class="text-xs text-neutral-700">
        {{ t('app.version') }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Detect deployment type
const deploymentType = computed(() => {
  if (typeof window === 'undefined') return 'unknown'
  const host = window.location.host || ''
  if (host.includes('github.io')) return 'gh-pages'
  if (host.includes('vercel.app')) return 'vercel'
  return 'development'
})

// Badge text based on deployment
const deploymentBadgeText = computed(() => {
  const type = deploymentType.value
  if (type === 'gh-pages') return `📄 ${t('footer.deployment.ghPages')}`
  if (type === 'vercel') return `⚡ ${t('footer.deployment.vercel')}`
  return `💻 Dev`
})
</script>
