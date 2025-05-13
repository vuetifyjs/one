import { fileURLToPath } from 'node:url'
import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'

export default {
  input: 'types-temp/src/index.d.ts',
  output: [{ file: 'dist/index.d.ts', format: 'es', sourcemap: false }],
  plugins: [
    dts(),
    alias({
      entries: [
        { find: /^@\/(.*)/, replacement: fileURLToPath(new URL('types-temp/src/$1', import.meta.url)) },
      ],
    }),
  ],
}
