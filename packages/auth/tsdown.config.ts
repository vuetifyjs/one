import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/stores/index.ts',
    'src/types/index.ts',
  ],
  format: 'esm',
  dts: true,
  clean: true,
  external: ['vue', 'pinia'],
})
