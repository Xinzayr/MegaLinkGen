import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoryStore = defineStore('history', () => {
    const STORAGE_KEY = 'mega_link_history'
    const MAX_HISTORY = 50

    const history = ref([])

    // Load history from localStorage
    const loadHistory = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                history.value = JSON.parse(stored)
            }
        } catch (e) {
            console.error('Error loading history:', e)
        }
    }

    // Save history to localStorage
    const saveHistory = () => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
        } catch (e) {
            console.error('Error saving history:', e)
        }
    }

    // Add item to history
    const addToHistory = (item) => {
        const newItem = {
            ...item,
            id: Date.now(),
            timestamp: new Date().toISOString()
        }
        history.value.unshift(newItem)
        if (history.value.length > MAX_HISTORY) {
            history.value = history.value.slice(0, MAX_HISTORY)
        }
        saveHistory()
    }

    // Remove item from history
    const removeFromHistory = (id) => {
        history.value = history.value.filter(item => item.id !== id)
        saveHistory()
    }

    // Clear all history
    const clearHistory = () => {
        if (confirm('¿Seguro que quieres limpiar todo el historial?')) {
            history.value = []
            saveHistory()
        }
    }

    // Get time ago string
    const timeAgo = (timestamp) => {
        const now = new Date()
        const past = new Date(timestamp)
        const diffMs = now - past
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 1) return 'ahora'
        if (diffMins < 60) return `hace ${diffMins}m`
        if (diffHours < 24) return `hace ${diffHours}h`
        return `hace ${diffDays}d`
    }

    return {
        history,
        loadHistory,
        saveHistory,
        addToHistory,
        removeFromHistory,
        clearHistory,
        timeAgo
    }
})
