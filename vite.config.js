import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  root: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        'admin-panel': path.resolve(__dirname, 'admin-panel.html')
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].[hash].js',
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    },
    commonjsOptions: {
      include: /node_modules/
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
