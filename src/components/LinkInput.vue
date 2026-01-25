<template>
  <div class="glass rounded-xl p-6 shadow-2xl">
    <div class="mb-4">
      <div class="flex items-center justify-between mb-2">
        <label class="block text-sm font-medium text-neutral-400">
          {{ t('input.label') }}
        </label>
        <div class="flex space-x-2">
          <button
            @click="toggleMode(false)"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-colors',
              !multiLinkMode
                ? 'bg-red-600 text-white'
                : 'bg-neutral-700 text-white hover:bg-neutral-600'
            ]"
          >
            {{ t('input.singleMode') }}
          </button>
          <button
            @click="toggleMode(true)"
            :class="[
              'px-3 py-1 text-sm rounded-md transition-colors',
              multiLinkMode
                ? 'bg-red-600 text-white'
                : 'bg-neutral-700 text-white hover:bg-neutral-600'
            ]"
          >
            {{ t('input.multiMode') }}
          </button>
        </div>
      </div>

      <!-- Single URL Input -->
      <div v-if="!multiLinkMode" class="relative">
        <input
          v-model="megaUrl"
          type="url"
          :placeholder="t('input.placeholder')"
          class="input-base pr-12"
          :class="{ 'border-red-600': error }"
          @input="clearError"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        />
        <!-- Clear button -->
        <button
          v-if="megaUrl"
          @click="clear"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors p-1 rounded-full hover:bg-neutral-700"
          aria-label="Clear input"
          type="button"
          tabindex="-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        </button>
        <div
          v-if="isDragging"
          class="absolute inset-0 bg-red-600/10 border-2 border-dashed border-red-500 rounded-lg flex items-center justify-center"
        >
          <p class="text-red-600 font-medium">{{ t('input.dragActive') }}</p>
        </div>
      </div>

      <!-- Multi URL Input -->
      <div v-else class="relative">
        <textarea
          v-model="multiLinkUrls"
          :placeholder="t('input.multiPlaceholder')"
          class="input-base min-h-[120px] font-mono text-sm"
          :class="{ 'border-red-600': error }"
          @input="clearError"
          @dragover="handleDragOver"
          @dragleave="handleDragLeave"
          @drop="handleDrop"
        ></textarea>
        <div
          v-if="isDragging"
          class="absolute inset-0 bg-red-600/10 border-2 border-dashed border-red-500 rounded-lg flex items-center justify-center"
        >
          <p class="text-red-600 font-medium">{{ t('input.dragActive') }}</p>
        </div>
      </div>

      <!-- Drag & Drop Hint -->
      <p class="mt-2 text-xs text-neutral-500">
        {{ t('dragDrop.hint') }}
      </p>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="mb-4 p-3 bg-red-900/50 border border-red-700 rounded-lg shadow-lg">
      <p class="text-sm text-red-300">{{ error }}</p>
    </div>

    <!-- Rate Limit Indicator -->
    <div v-if="rateLimitCooldown > 0" class="mb-4 p-3 bg-yellow-900/30 border border-yellow-700 rounded-lg">
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm text-yellow-200 font-medium">
          {{ t('rateLimit.active') }}
        </p>
        <p class="text-sm text-yellow-200">
          {{ t('rateLimit.wait', { seconds: Math.ceil(rateLimitCooldown / 1000) }) }}
        </p>
      </div>
      <div class="w-full h-2 bg-yellow-800 rounded-full overflow-hidden">
        <div
          class="h-full bg-yellow-400 transition-all duration-100"
          :style="{ width: `${rateLimitProgress}%` }"
        ></div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex space-x-2">
      <button
        v-if="!multiLinkMode"
        @click="generate"
        :disabled="loading || !isValidMegaUrl || rateLimitCooldown > 0"
        class="btn-primary w-full flex items-center justify-center space-x-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ loading ? t('buttons.processing') : t('buttons.generate') }}</span>
      </button>

      <button
        v-else
        @click="processMultiple"
        :disabled="loading || multiLinkUrls.trim().length === 0"
        class="btn-primary flex-1 flex items-center justify-center space-x-2"
      >
        <svg v-if="loading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>{{ loading ? t('buttons.processing') : t('buttons.process') }}</span>
      </button>

      <button @click="clear" class="btn-secondary">{{ t('buttons.clear') }}</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMegaApi } from '../composables/useMegaApi'
import { useDragDrop } from '../composables/useUtils'
import { useMegaStore } from '../stores/mega'

const { t } = useI18n()
const megaStore = useMegaStore()
const { getFileInfo, processMultipleLinks } = useMegaApi()
const { handleDragOver, handleDragLeave, handleDrop } = useDragDrop()

const megaUrl = computed({
  get: () => megaStore.megaUrl,
  set: (val) => megaStore.megaUrl = val
})

const multiLinkMode = computed({
  get: () => megaStore.multiLinkMode,
  set: (val) => megaStore.multiLinkMode = val
})

const multiLinkUrls = computed({
  get: () => megaStore.multiLinkUrls,
  set: (val) => megaStore.multiLinkUrls = val
})

const loading = computed(() => megaStore.loading)
const error = computed(() => megaStore.error)
const isValidMegaUrl = computed(() => megaStore.isValidMegaUrl)
const rateLimitCooldown = computed(() => megaStore.rateLimitCooldown)
const rateLimitProgress = computed(() => megaStore.rateLimitProgress)
const isDragging = computed(() => megaStore.isDragging)

const toggleMode = (mode) => {
  multiLinkMode.value = mode
  megaStore.clearError()
}

const generate = () => {
  getFileInfo()
}

const processMultiple = () => {
  processMultipleLinks()
}

const clear = () => {
  megaStore.clearInput()
  multiLinkUrls.value = ''
  megaStore.multiLinkResults = []
}

const clearError = () => {
  megaStore.clearError()
}
</script>
