<template>
  <header class="sticky top-0 z-30 bg-neutral-900/80 backdrop-blur border-b border-neutral-800 shadow-[0_1px_0_rgba(255,255,255,0.05)]">
    <div class="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="relative inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-red-600 to-red-500 shadow-lg shadow-red-900/30">
          <div class="absolute inset-0 blur-2xl bg-red-600 opacity-25"></div>
          <svg class="w-6 h-6 text-white relative" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
        </div>
        <div>
          <h1 class="text-lg md:text-xl font-semibold text-white leading-tight">{{ t('app.title') }}</h1>
          <p class="text-xs md:text-sm text-neutral-400 leading-tight">{{ t('app.subtitle') }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <select
          v-model="locale"
          @change="changeLanguage"
          class="px-3 py-2 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option value="es">🇪🇸 {{ t('language.es') }}</option>
          <option value="en">🇬🇧 {{ t('language.en') }}</option>
          <option value="pt">🇧🇷 {{ t('language.pt') }}</option>
          <option value="fr">🇫🇷 {{ t('language.fr') }}</option>
                    <option value="zh">🇨🇳 {{ t('language.zh') }}</option>
                    <option value="hi">🇮🇳 {{ t('language.hi') }}</option>
                    <option value="ar">🇸🇦 {{ t('language.ar') }}</option>
                    <option value="ru">🇷🇺 {{ t('language.ru') }}</option>
       
        </select>

        <button
          @click="toggleDeveloperMode"
          :class="[
            'px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-neutral-700',
            developerMode
              ? 'bg-red-600 text-white border-red-500'
              : 'bg-neutral-800 text-white hover:bg-neutral-700'
          ]"
          aria-label="Toggle developer mode"
        >
          {{ developerMode ? '👨‍💻 Dev' : '👤' }}
        </button>
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
