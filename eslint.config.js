import vuetify from 'eslint-config-vuetify'

export default vuetify(
  {
    perfectionist: {
      import: false,
    },
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
