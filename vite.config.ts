import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const salesforceUrl = 'https://creative-wolf-se3i8r-dev-ed.trailblaze.my.salesforce.com/services/apexrest'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/auth': {
        target: 'https://login.salesforce.com/services/oauth2/token',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/auth/, ''),
      },
      '/Patient': {
        target: salesforceUrl + '/Patient',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/Patient/, ''),
      },
      '/Visit': {
        target: salesforceUrl + '/Visit',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/Visit/, ''),
      }
    }
  }
})
