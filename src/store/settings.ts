import { defineStore } from 'pinia'

import { useAuthStore } from './auth'
import { useUserStore } from './user'

import { computed, watch } from 'vue'
import { useTheme } from 'vuetify'

export interface Suit {
  'app-bar': string
  'drawer': string
  footer: string
}

export interface State {
  CDN_URL: string
  suit: Suit | {}
}

function genThemes () {
  return {
    blackguard: {
      dark: true,
      colors: {
        background: '#0f0c24',
        primary: '#e7810d',
        surface: '#1e184a',
        info: '#9c27b0',
        accent: '#FF4081',
        success: '#84b38a',
        'surface-light': '#362b89',
        'surface-bright': '#564f8a',
        'surface-variant': '#6458b4',
        'on-surface-variant': '#FFFFFF',
        'primary-darken-1': '#c56e0b',
        secondary: '#8A2BE2',
        'secondary-darken-1': '#7919cb',
        error: '#FF5555',
        warning: '#ffa726',
      },
      variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.10,
        'hover-opacity': 0.08,
        'focus-opacity': 0.12,
        'selected-opacity': 0.12,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.16,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#343434',
        'theme-on-code': '#CCCCCC',
      },
    },
    nebula: {
      dark: true,
      colors: {
        background: '#0a0f1b',
        surface: '#1c1f2a',
        primary: '#4d5b9e',
        'primary-darken-1': '#424a8c',
        secondary: '#7a82d2',
        accent: '#00eaff',
        info: '#29b6f6',
        warning: '#ffeb3b',
        error: '#e91e63',
        success: '#4caf50',
        'on-surface-variant': '#5c6bc0',
        'surface-light': '#2a3c66',
        'secondary-darken-1': '#686f9a',
      },
      variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.10,
        'hover-opacity': 0.08,
        'focus-opacity': 0.12,
        'selected-opacity': 0.12,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.16,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#343434',
        'theme-on-code': '#CCCCCC',
      },
    },
    highContrast: {
      dark: true,
      colors: {
        background: '#000000',
        surface: '#000000',
        primary: '#ffD700',
        'primary-darken-1': '#e6c300',
        secondary: '#00ff00',
        'secondary-darken-1': '#00e600',
        accent: '#ff00ff',
        info: '#31aaff',
        warning: '#ffaa00',
        error: '#ff0000',
        success: '#00ff00',
        'on-surface-variant': '#000000',
        'surface-light': '#f2f2f2',
        'surface-bright': '#e6e6e6',
        'surface-variant': '#cccccc',
      },
      variables: {
        'border-color': '#ffffff',
        'border-opacity': 0.87,
        'high-emphasis-opacity': 1.0,
        'medium-emphasis-opacity': 0.87,
        'disabled-opacity': 0.5,
        'idle-opacity': 0.1,
        'hover-opacity': 0.2,
        'focus-opacity': 0.3,
        'selected-opacity': 0.3,
        'activated-opacity': 0.3,
        'pressed-opacity': 0.4,
        'dragged-opacity': 0.2,
        'theme-kbd': '#000000',
        'theme-on-kbd': '#ffffff',
        'theme-code': '#000000',
        'theme-on-code': '#ffffff',
      },
    },
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const CDN_URL = 'https://cdn.vuetifyjs.com/docs/images/one/'

  const auth = useAuthStore()
  const user = useUserStore()
  const theme = useTheme()

  const themes = genThemes()

  const suits = {
    blackguard: {
      'app-bar': CDN_URL + 'suits/blackguard/blackguard-app-bar.png',
      drawer: CDN_URL + 'suits/blackguard/blackguard-app-drawer.png',
      footer: '',
    },
    // polaris: {
    //   'app-bar': '',
    //   'drawer': '',
    //   footer: '',
    // },
    // nebula: {
    //   'app-bar': '',
    //   'drawer': '',
    //   footer: '',
    // },
  } as Record<string, Suit>

  const suit = computed(() => {
    if (!user.suits.suit || !user.suits.show || !auth.isSubscriber) return {}

    const _suit = suits[user.suits.suit.toLowerCase()]
    const suit = {} as Partial<Suit>

    for (const val of user.suits.elements) {
      suit[val] = _suit[val]
    }

    return suit
  })

  theme.themes.value = {
    ...theme.themes.value,
    ...themes,
  } as any

  watch(() => user.theme, val => {
    if (val === 'system') {
      theme.global.name.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      theme.global.name.value = val
    }

    user.theme = val
  })

  return {
    suit,
    CDN_URL,
  } satisfies State
})
