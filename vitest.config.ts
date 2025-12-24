/// <reference types="vitest" />

import { fileURLToPath } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        'vue',
        'pinia',
      ],
      dirs: [
        './src/stores',
        './src/composables',
        './src/util',
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '@/stores': fileURLToPath(new URL('src/stores', import.meta.url)),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
  },
})
