// Utilities
import { merge } from 'lodash-es'
import { migrateUserData, type RootState } from './migrations'

// Globals
const IN_BROWSER = typeof window !== 'undefined'

export const DEFAULT_USER: RootState = {
  version: 6,
  ecosystem: {
    bin: {
      wordWrap: false,
    },
    play: {
      showErrors: true,
      wordWrap: false,
    },
    studio: {},
    link: {},
    docs: {
      api: 'link-only',
      composition: 'composition',
      pins: {
        enabled: false,
        pinned: [],
      },
      mixedTheme: true,
      favorites: [],
      slashSearch: false,
      railDrawer: false,
    },
  },
  one: {
    avatar: '',
    ads: {
      enabled: true,
      house: false,
    },
    command: {},
    theme: 'system',
    direction: 'ltr',
    colors: {
      primary: 'surface-light',
    },
    suits: {
      enabled: false,
      elements: ['app-bar'],
      suit: '',
    },
    notifications: {
      enabled: true,
      read: [],
      last: '',
    },
    banners: {
      enabled: true,
      read: [],
      last: '',
    },
    quicklinks: false,
    sync: true,
    devmode: false,
  },
}

export const useUserStore = defineStore('user', () => {
  const state = reactive(structuredClone(DEFAULT_USER))

  watch(state, save, { deep: true })

  function load () {
    if (!IN_BROWSER) {
      return
    }

    const stored = localStorage.getItem('vuetify@user')

    if (!stored) {
      return
    }

    try {
      const data = JSON.parse(stored)

      if (data.version >= 6) {
        const currentState = {
          version: 6,
          ecosystem: merge(DEFAULT_USER.ecosystem, data.ecosystem || {}),
          one: merge(DEFAULT_USER.one, data.one || {}),
        }
        Object.assign(state, currentState)
      } else {
        const migratedState = migrateUserData(data)
        Object.assign(state, migratedState)
      }

      save()
    } catch (error) {
      console.error('Failed to load user settings:', error)
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

    Object.assign(state, structuredClone(DEFAULT_USER))
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
