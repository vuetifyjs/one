import { defineStore } from 'pinia'

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
    polaris: {
      dark: true,
      colors: {
        background: '#1f0a0d',
        primary: '#972800',
        surface: '#29110e',
        info: '#e7810d',
        accent: '#b35000',
        success: '#486a2b',
        'surface-light': '#773421',
        'surface-bright': '#ffa752',
        'surface-variant': '#924d2c',
        'on-surface-variant': '#FFFFFF',
        'primary-darken-1': '#c33100',
        secondary: '#ac1900',
        'secondary-darken-1': '#8a1600',
        error: '#ff5555',
        warning: '#ffa726',
      },
      variables: {
        'border-color': '#ffffff',
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
        'theme-on-kbd': '#ffffff',
        'theme-code': '#343434',
        'theme-on-code': '#cccccc',
      },
    },
    nebula: {
      dark: true,
      colors: {
        background: '#0f172a',
        primary: '#3462e3',
        surface: '#1e293b',
        info: '#64748b',
        accent: '#0ea5e9',
        success: '#14b8a6',
        'surface-light': '#2e3d59',
        'surface-bright': '#87a7ff',
        'surface-variant': '#334155',
        'on-surface-variant': '#FFFFFF',
        'primary-darken-1': '#1c2d60',
        secondary: '#0284c7',
        'secondary-darken-1': '#0369a1',
        error: '#ef4444',
        warning: '#f97316',
      },
      variables: {
        'border-color': '#ffffff',
        'border-opacity': 0.2,
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
        'theme-kbd': '#1e40af',
        'theme-on-kbd': '#dbeafe',
        'theme-code': '#0f172a',
        'theme-on-code': '#93c5fd',
      },
    },
    odyssey: {
      dark: false,
      colors: {
        background: '#fffbe6',
        primary: '#356859',
        surface: '#fffbe6',
        info: '#37966f',
        accent: '#b9e4c9',
        success: '#5bb49a',
        'surface-light': '#95b3a0',
        'surface-bright': '#ffffff',
        'surface-variant': '#37966f',
        'primary-darken-1': '#00CC00',
        secondary: '#FD5523',
        'secondary-darken-1': '#CC3700',
        error: '#FF5555',
        warning: '#ecb85b',
      },
      variables: {
        'border-color': '#000000',
        'border-opacity': 0.24,
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
    highContrast: {
      dark: true,
      colors: {
        background: '#000000',
        surface: '#121212',
        primary: '#ffD700',
        'primary-darken-1': '#e6c300',
        secondary: '#00ccdd',
        'secondary-darken-1': '#00e600',
        accent: '#ff00ff',
        info: '#31aaff',
        warning: '#ffaa00',
        error: '#ff0000',
        success: '#00ff00',
        'on-surface-variant': '#ffffff',
        'surface-light': '#222222',
        'surface-bright': '#000000',
        'surface-variant': '#333333',
      },
      variables: {
        'border-color': '#ffffff',
        'border-opacity': 0.87,
        'high-emphasis-opacity': 1.0,
        'medium-emphasis-opacity': 0.87,
        'disabled-opacity': 0.8,
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

  const one = useOneStore()
  const user = useUserStore()
  const theme = useTheme()

  const themes = genThemes()

  const suits = {
    blackguard: {
      'app-bar': CDN_URL + 'suits/blackguard/blackguard-app-bar.png',
      drawer: CDN_URL + 'suits/blackguard/blackguard-app-drawer.png',
      footer: CDN_URL + 'suits/blackguard/blackguard-app-footer.png',
    },
    polaris: {
      'app-bar': CDN_URL + 'suits/polaris/polaris-app-bar.png',
      drawer: CDN_URL + 'suits/polaris/polaris-app-drawer.png',
      footer: CDN_URL + 'suits/polaris/polaris-app-footer.png',
    },
    nebula: {
      'app-bar': CDN_URL + 'suits/nebula/nebula-app-bar.png',
      drawer: CDN_URL + 'suits/nebula/nebula-app-drawer.png',
      footer: CDN_URL + 'suits/nebula/nebula-app-footer.png',
    },
    odyssey: {
      'app-bar': CDN_URL + 'suits/odyssey/odyssey-app-bar.png',
      drawer: CDN_URL + 'suits/odyssey/odyssey-app-drawer.png',
      footer: CDN_URL + 'suits/odyssey/odyssey-app-footer.png',
    },
  } as Record<string, Suit>

  const suit = computed(() => {
    if (!user.suits.suit || !user.suits.show || !one.isSubscriber) return {}

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
      user.suits.suit = suits[val] ? val : ''
    }

    user.theme = val
  }, { immediate: true })

  return {
    suit,
    CDN_URL,
  } satisfies State
})
