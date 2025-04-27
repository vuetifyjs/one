// Plugins
import Components from 'unplugin-vue-components/vite'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Vue({
      template: { transformAssetUrls },
    }),
    Components({
      dirs: ['src/components'],
      dts: 'src/components.d.ts',
    }),
    Vuetify({
      autoImport: true,
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          'vue-router/auto': [
            'definePage',
          ],
          vuetify: [
            'useDisplay',
            'useDate',
            'useTheme',
          ],
        },
      ],
      dirs: [
        './src/stores',
        './src/composables',
        './src/util',
      ],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
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
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VuetifyOne',
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'vue',
        /^vuetify($|\/)/,
        'pinia',
        'vue-router',
        'vue-router/auto',
        'unplugin-vue-router',
        'lodash-es',
        '@mdi/js',
      ],
    },
  },
})
