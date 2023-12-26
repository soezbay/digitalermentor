import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path'
import legacy from '@vitejs/plugin-legacy'
import pwamanifest from './manifest.json';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    legacy(),
    VitePWA(
      // {
      //   manifest: {
      //     name: "Digitaler Mentor",
      //     short_name: "Digimentor",
      //     description: "Deine GoTo App die dir beim Planen deines Studiums unter die Arme greift. Module auflisten, deinen Studienverlauf planen und Ziele definieren die essenziel für dein Studium sein könnten!",
      //     theme_color: "#8C9900",
      //     display: "standalone",
      //     background_color: "#000000",
      //     icons: [
      //       {
      //         src: "/resources/App_Logo_DigitalerMentor_192x192.png",
      //         sizes: "192x192",
      //         type: "image/png"
      //       },
      //       {
      //         src: "/resources/App_Logo_DigitalerMentor_512x512.png",
      //         sizes: "512x512",
      //         type: "image/png"
      //       },
      //       {
      //         src: "/resources/App_Logo_DigitalerMentor_512x512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //         purpose: "any"
      //       },
      //       {
      //         src: "/resources/App_Logo_DigitalerMentor_512x512.png",
      //         sizes: "512x512",
      //         type: "image/png",
      //         purpose: "maskable"
      //       },
      //     ]
      //   }
      // },
      { manifest: pwamanifest },
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
