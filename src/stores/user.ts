// Utilities
import { merge } from 'lodash-es'

// Types
import type { VOneSuit } from './settings'

// Globals
const IN_BROWSER = typeof window !== 'undefined'

export type RootState = {
  v: 2 | 3 | 4 | 5
  api: 'link-only' | 'inline'
  avatar: string
  dev: boolean
  disableAds: boolean
  composition: ('options' | 'composition')
  pwaRefresh: boolean
  slashSearch: boolean
  syncSettings: boolean
  showHouseAds: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  quickbar: boolean
  railDrawer: boolean
  pins: boolean
  pinned: Record<string, unknown>[]
  suits: {
    show: boolean
    elements: (keyof VOneSuit)[]
    suit: string
  }
  colors: {
    one: string
  }
  notifications: {
    show: boolean
    banners: boolean
    read: string[]
    last: {
      banner: string[]
      v2banner: null | number
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
}

export type SavedState = {
  api: boolean
  drawer: { alphabetical: boolean, mini: boolean }
  last: {
    install: null | number
    notification: null | number
    promotion: null | number
    jobs: null | number
  }
  pwaRefresh: boolean
  rtl: boolean
  theme: {
    dark: boolean
    system: boolean
    mixed: boolean
  }
} | {
  api: 'link-only' | 'inline'
  pwaRefresh: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  notifications: {
    read: string[]
    last: {
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
} | {
  v: 1
  api: 'link-only' | 'inline'
  dev?: boolean
  composition?: ('options' | 'composition') | ('options' | 'composition')[]
  pwaRefresh: boolean
  theme: string
  mixedTheme: boolean
  direction: 'rtl' | 'ltr'
  notifications: {
    show?: boolean
    read: string[]
    last: {
      banner?: null | number | string[]
      v2banner?: null | number
      install: null | number
      notification: null | number
      promotion: null | number
      jobs: null | number
    }
  }
} | RootState

export const DEFAULT_USER: RootState = {
  v: 5,
  api: 'link-only',
  avatar: '',
  dev: false,
  disableAds: false,
  composition: 'composition',
  pwaRefresh: true,
  theme: 'system',
  mixedTheme: true,
  direction: 'ltr',
  pins: false,
  pinned: [],
  slashSearch: false,
  syncSettings: true,
  showHouseAds: false,
  quickbar: false,
  railDrawer: false,
  suits: {
    show: false,
    elements: ['app-bar'],
    suit: '',
  },
  colors: {
    one: 'surface-light',
  },
  notifications: {
    show: true,
    banners: true,
    read: [],
    last: {
      banner: [],
      v2banner: null,
      install: null,
      notification: null,
      promotion: null,
      jobs: null,
    },
  },
}

export const useUserStore = defineStore('user', () => {
  const state = reactive(merge({}, DEFAULT_USER))

  watch(state, save)

  function load () {
    if (!IN_BROWSER) {
      return
    }

    const stored = localStorage.getItem('vuetify@user')
    const data = stored ? JSON.parse(stored) : {}
    let needsRefresh = data.v === state.v

    if (!data.v) {
      data.pwaRefresh = true
      if (typeof data.api === 'boolean') {
        data.api = data.api ? 'inline' : 'link-only'
      }
      if (typeof data.rtl === 'boolean') {
        data.direction = data.rtl ? 'rtl' : 'ltr'
        delete data.rtl
      }
      if (typeof data.theme === 'object') {
        data.mixedTheme = data.theme.mixed
        data.theme = data.theme.system
          ? 'system'
          : (data.theme.dark
              ? 'dark'
              : 'light')
      }
      if (Array.isArray(data.notifications)) {
        data.notifications = { read: data.notifications }
      }
      if (typeof data.last === 'object') {
        data.notifications.last = data.last
        delete data.last
      }
    }

    if (data.v === 1) {
      if (Array.isArray(data.composition)) {
        data.composition = 'composition'
      }
      if (!Array.isArray(data.notifications.last.banner)) {
        data.notifications = data.notifications || {}
        data.notifications.last = data.notifications.last || {}
        data.notifications.last.banner = []
      }
    }

    if (data.v === 2) {
      data.syncSettings = true
      data.disableAds = false
      data.v = 3
    }

    if (data.v === 3) {
      data.quickbar = false
    }

    if (data.v === 4) {
      data.suits = DEFAULT_USER.suits
      data.notifications.banners = DEFAULT_USER.notifications.banners
      needsRefresh = true
    }

    data.v = state.v
    Object.assign(state, merge(state, data))
    if (needsRefresh) {
      save()
    }
  }

  function save () {
    if (!IN_BROWSER) {
      return
    }

    localStorage.setItem('vuetify@user', JSON.stringify(state, null, 2))
  }

  function reset () {
    if (!IN_BROWSER) {
      return
    }

    Object.assign(state, merge({}, DEFAULT_USER))

    save()
  }

  load()

  return {
    ...toRefs(state),
    load,
    save,
    reset,
  }
})
