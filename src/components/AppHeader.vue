<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </div>
          <div>
            <h1 class="text-xl font-bold text-gray-900">{{ t('app.title') }}</h1>
            <p class="text-sm text-gray-500">{{ t('app.subtitle') }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <select
            v-model="locale"
            @change="changeLanguage"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="es">🇪🇸 {{ t('language.es') }}</option>
            <option value="en">🇬🇧 {{ t('language.en') }}</option>
            <option value="pt">🇧🇷 {{ t('language.pt') }}</option>
            <option value="fr">🇫🇷 {{ t('language.fr') }}</option>
          </select>

          <!-- Developer Mode Toggle -->
          <button
            @click="toggleDeveloperMode"
            :class="[
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              developerMode
                ? 'bg-primary-700 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            ]"
          >
            {{ developerMode ? '👨‍💻 Dev' : '👤' }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMegaStore } from '../stores/mega'

const { t, locale } = useI18n()
const megaStore = useMegaStore()

const developerMode = computed(() => megaStore.developerMode)

const changeLanguage = () => {
  localStorage.setItem('locale', locale.value)
}

const toggleDeveloperMode = () => {
  megaStore.developerMode = !megaStore.developerMode
}
</script>
