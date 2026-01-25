import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
const BASE = process.env.GITHUB_PAGES === 'true' ? '/MegaLinkGen/' : '/'

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            selfDestroying: true, // forzar limpieza de SW viejo en GH Pages
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Mega Link Generator',
                short_name: 'MegaGen',
                description: 'Generate direct download links from Mega.nz URLs',
                theme_color: '#D32F2F',
                background_color: '#FFFFFF',
                display: 'standalone',
                orientation: 'portrait-primary',
                scope: BASE,
                start_url: BASE,
                icons: [
                    {
                        src: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"%3E%3Crect width="512" height="512" rx="128" fill="%23D32F2F"/%3E%3Cpath d="M128 160l128 192 128-192v192H128z" fill="%23fff"/%3E%3C/svg%3E',
                        sizes: '512x512',
                        type: 'image/svg+xml',
                        purpose: 'any maskable'
                    }
                ],
                shortcuts: [
                    {
                        name: 'Generate Link',
                        short_name: 'Generate',
                        description: 'Quick link generation',
                        url: `${BASE}?action=generate`,
                        icons: []
                    }
                ]
            },
            workbox: {
                cleanupOutdatedCaches: true,
                globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            }
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    // Configuración para GitHub Pages y Vercel
    // Usa /MegaLinkGen/ como base cuando se construye para GitHub Pages
    base: BASE,
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor': ['vue', 'vue-router', 'pinia'],
                    'i18n': ['vue-i18n'],
                    'qr': ['qrcode']
                }
            }
        }
    }
})
