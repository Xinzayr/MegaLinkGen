<template>
  <footer class="w-full text-center p-6 text-neutral-600 text-sm border-t border-neutral-800 bg-neutral-900/50 mt-12">
    <div class="max-w-2xl mx-auto space-y-2">
      <p class="text-xs text-neutral-700">
        {{ t('footer.disclaimer') }}
      </p>
      <p class="flex items-center justify-center gap-2 flex-wrap">
        <span class="text-neutral-500">Made with</span>
        <span aria-hidden="true">❤️</span>
        <a
          href="https://github.com/Xinzayr"
          target="_blank"
          rel="noopener noreferrer"
          class="text-red-500 hover:text-red-400 transition-colors font-semibold hover:underline"
        >
          Xinzaýr
        </a>
      </p>
      <p class="text-xs text-neutral-700">
        {{ t('app.version') }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
