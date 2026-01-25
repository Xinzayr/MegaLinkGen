<template>
  <footer class="mt-12 py-8 bg-white border-t border-gray-200">
    <div class="container mx-auto px-4 text-center">
      <p class="text-sm text-gray-600 mb-2">
        {{ t('footer.disclaimer') }}
      </p>
      <p class="text-sm text-gray-500">
        {{ t('footer.madeWith') }} ❤️ {{ t('footer.by') }}
        <a href="https://github.com" target="_blank" class="text-primary-600 hover:text-primary-700 font-medium">
          {{ t('footer.opensource') }}
        </a>
      </p>
      <p class="text-xs text-gray-400 mt-2">
        {{ t('app.version') }}
      </p>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>
