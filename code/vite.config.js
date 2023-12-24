import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA(
      { registerType: 'autoUpdate' },
      { injectRegister: 'auto' },
      { strategies: 'generateSW' },
      {
        workbox: {
          runtimeCaching: [{
            handler: 'NetworkFirst',
            urlPattern: /\/api\/.*\/*.json/,
            // urlPattern: ({ url }) => {
            //   return url.pathname.startsWith("/")
            // }
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200]
              },
              backgroundSync: {
                name: 'backgroundSync1',
                options: {
                  maxRetentionTime: 24 * 60
                }
              }
            }
          }]
        }
      }
    ),
    legacy(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // test: {
  //   globals: true,
  //   environment: 'jsdom'
  // }
})
