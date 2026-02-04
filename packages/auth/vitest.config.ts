import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.spec.ts'],
    setupFiles: ['src/stores/__tests__/setup.ts'],
  },
})
