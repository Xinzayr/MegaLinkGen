<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">{{ t('features.title') }}</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="feature in features"
        :key="feature.key"
        class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
      >
        <div class="text-3xl mb-3">{{ feature.icon }}</div>
        <h3 class="font-semibold text-gray-900 mb-2">{{ t(`features.${feature.key}.title`) }}</h3>
        <p class="text-sm text-gray-600">{{ t(`features.${feature.key}.desc`) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

const features = [
  { key: 'pwa', icon: '📱' },
  { key: 'batch', icon: '⚡' },
  { key: 'history', icon: '📚' },
  { key: 'qr', icon: '📱' },
  { key: 'i18n', icon: '🌍' },
  { key: 'test', icon: '✅' }
]
</script>
