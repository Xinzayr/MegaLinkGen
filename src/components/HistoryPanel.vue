<template>
  <div class="card">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-bold text-gray-900">{{ t('history.title') }}</h2>
      <div class="flex space-x-2">
        <button
          @click="toggleHistory"
          class="btn-secondary text-sm"
        >
          {{ showHistory ? t('history.hide') : t('history.show') }}
        </button>
        <button
          v-if="history.length > 0"
          @click="clear"
          class="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          {{ t('history.clear') }}
        </button>
      </div>
    </div>

    <div v-if="showHistory">
      <div v-if="history.length === 0" class="text-center py-8 text-gray-500">
        <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <p>{{ t('history.empty') }}</p>
      </div>

      <div v-else class="space-y-3 max-h-96 overflow-y-auto">
        <div
          v-for="item in history"
          :key="item.id"
          class="p-4 border border-gray-200 rounded-lg hover:border-primary-300 transition-colors"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate mb-1">
                {{ item.fileInfo?.name || 'Unknown' }}
              </p>
              <p class="text-xs text-gray-500 mb-2">
                {{ timeAgo(item.timestamp) }}
              </p>
              <p class="text-xs text-gray-400 font-mono truncate">
                {{ item.url }}
              </p>
            </div>
            <div class="flex space-x-2 ml-4">
              <button
                @click="regenerate(item)"
                class="text-primary-600 hover:text-primary-700"
                :title="t('history.regenerate')"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
              </button>
              <button
                @click="remove(item.id)"
                class="text-red-600 hover:text-red-700"
                :title="t('history.delete')"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHistoryStore } from '../stores/history'
import { useMegaStore } from '../stores/mega'

const { t } = useI18n()
const historyStore = useHistoryStore()
const megaStore = useMegaStore()

const showHistory = ref(false)

const history = computed(() => historyStore.history)

const toggleHistory = () => {
  showHistory.value = !showHistory.value
}

const clear = () => {
  historyStore.clearHistory()
}

const remove = (id) => {
  historyStore.removeFromHistory(id)
}

const regenerate = (item) => {
  megaStore.megaUrl = item.url
  megaStore.multiLinkMode = false
  // Trigger generation automatically would require getFileInfo call
}

const timeAgo = (timestamp) => {
  return historyStore.timeAgo(timestamp)
}
</script>
