import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'

/** @type {import("rollup").RollupOptions[]} */
const options = [{
  input: 'types-temp/src/index.d.ts',
  output: { file: 'dist/index.d.ts', format: 'es', sourcemap: false },
  plugins: [
    dts(),
    alias({
      entries: [
        { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('types-temp/src/$1', import.meta.url)) },
      ],
    }),
  ],
}, {
  input: 'types-temp/src/stores/auth.d.ts',
  output: { file: 'dist/stores/auth.d.ts', format: 'es', sourcemap: false },
  plugins: [
    dts(),
    alias({
      entries: [
        { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('types-temp/src/$1', import.meta.url)) },
      ],
    }),
  ],
}]

export default options
