import TSConfig from 'eslint-config-vuetify/index.ts.mjs'
import ignoreConfig from 'eslint-config-flat-gitignore'
import vitestPlugin from '@vitest/eslint-plugin'

export default [
  ignoreConfig(),
  ...TSConfig,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    languageOptions: {
      globals: {
        'RequestInit': true,
      },
    },
  },
  {
    files: ['**/*.spec.{ts,js}'],
    plugins: {
      vitest: vitestPlugin,
    },
    rules: {
      ...vitestPlugin.configs.recommended.rules,
    },
    languageOptions: {
      globals: {
        ...vitestPlugin.environments.env.globals,
      },
    },
  },
]
