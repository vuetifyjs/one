import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    perfectionist: {
      import: false,
    },
  },
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/types-temp/**',
    ],
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
    languageOptions: {
      globals: {
        RequestInit: true,
      },
    },
  },
)
