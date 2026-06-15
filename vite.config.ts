import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 5173,
    open: true,
    host: '0.0.0.0'
  },
  build: {
  outDir: 'dist',
  chunkSizeWarningLimit: 1000,
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes('vue') || id.includes('vue-router')) {
          return 'vue-vendor'
        }
        if (id.includes('element-plus')) {
          return 'element-vendor'
        }
      }
    }
  }
}
})