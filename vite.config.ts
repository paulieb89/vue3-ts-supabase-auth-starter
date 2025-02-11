import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@views': path.resolve(__dirname, './src/views'),
      '@types': path.resolve(__dirname, './src/types'),
      '@lib': path.resolve(__dirname, './src/lib'),
      '@composables': path.resolve(__dirname, './src/composables'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@layouts': path.resolve(__dirname, './src/layouts')
    }
  },
  server: {
    port: 4000, // Use a completely different port
    strictPort: true,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 4000,
      clientPort: 4000
    }
  },
  // Add logging
  logLevel: 'info',
  clearScreen: false
})
