<template>
  <header class="border-b border-neutral-800 bg-transparent">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-red-600 blur-2xl opacity-20 rounded-full animate-pulse"></div>
            <div class="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center relative">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 class="text-xl font-bold text-white">{{ t('app.title') }}</h1>
            <p class="text-sm text-neutral-400">{{ t('app.subtitle') }}</p>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Language Selector -->
          <select
            v-model="locale"
            @change="changeLanguage"
            class="px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                ? 'bg-red-600 text-white'
                : 'bg-neutral-700 text-white hover:bg-neutral-600'
            ]"
            aria-label="Toggle developer mode"
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
