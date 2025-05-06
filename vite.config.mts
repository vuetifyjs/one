// Plugins
import Components from 'unplugin-vue-components/vite'
import Layouts from 'vite-plugin-vue-layouts-next'
import Vue from '@vitejs/plugin-vue'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import ViteFonts from 'unplugin-fonts/vite'
import VueRouter from 'unplugin-vue-router/vite'
import AutoImport from 'unplugin-auto-import/vite'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: true,
    }),
    Vue({
      template: { transformAssetUrls },
    }),
    Layouts(),
    Components({
      dirs: ['lib/components', 'src/components'],
      dts: true,
    }),
    Vuetify({ autoImport: true }),
    ViteFonts({
      fontsource: {
        families: [
          {
            name: 'Roboto',
            weights: [100, 300, 400, 500, 700, 900],
            styles: ['normal', 'italic'],
          },
        ],
      },
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
      dts: true,
      eslintrc: {
        enabled: true,
      },
      vueTemplate: true,
    }),
  ],
  optimizeDeps: {
    exclude: ['vuetify'],
  },
  define: { 'process.env': {} },
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
  server: {
    port: 3000,
  },
})
