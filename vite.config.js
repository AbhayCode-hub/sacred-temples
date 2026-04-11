import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    minify: 'terser',
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: [
            'https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js',
            'https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js'
          ]
        }
      }
    }
  },
  server: {
    port: 5173,
    open: true,
    cors: true
  },
  preview: {
    port: 4173,
    strictPort: false,
    open: false
  }
})
