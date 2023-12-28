import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'


// https://vitejs.dev/config/
export default defineConfig({
  base: '/digitalermentor/', // Beispiel-Basis-URL für die Produktion
  plugins: [vue(), legacy()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
