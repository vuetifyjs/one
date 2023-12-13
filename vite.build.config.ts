// Plugins
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    Vuetify({
      autoImport: false,
      styles: "none",
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'VuetifyOne',
      fileName: 'v-one',
    },
    rollupOptions: {
      external: ['vue', 'vuetify', '@mdi/js', 'pinia'],
      output: {
        globals: {
          vue: 'vue',
          vuetify: 'vuetify',
          '@mdi/js': '@mdi/js',
          pinia: 'pinia'
        }
      }
    },
  },
})
