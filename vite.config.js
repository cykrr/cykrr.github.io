import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    allowedHosts: ["archlinux"]
  }
  // Project root directory (default: process.cwd())
  root: './',
  
  // Base public path when served in development or production
  base: '/',

  // Server options
  // server: {
  //   port: 3000,
  //   open: true, // Opens browser on startup
  //   proxy: {
  //     '/api': 'http://localhost:5000' // Proxy API requests
  //   }
  // },

  // Build options
  // build: {
  //   outDir: 'dist',
  //   minify: 'esbuild', // Options: 'esbuild' or 'terser'
  //   sourcemap: true
  // },

  // Plugins (e.g., @vitejs/plugin-vue, @vitejs/plugin-react)
  plugins: []
})

