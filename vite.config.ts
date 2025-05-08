import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  build: {
    rollupOptions: {
      // 确保正确处理Leaflet资源
      external: [],
      output: {
        // 处理静态资源
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  // 解析别名
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
