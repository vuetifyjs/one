// Pinia
import { defineStore } from 'pinia'

// Utilities
import { merge } from 'lodash-es'
import { ref, reactive, toRefs } from 'vue'

// Globals
const IN_BROWSER = typeof window !== 'undefined'

export const DEFAULT_SETTINGS = {
  api: 'link-only',
  avatar: '',
  banners: {
    show: true,
    last: null,
    read: [],
  },
  compositionType: 'composition',
  devMode: false,
  ads: {
    show: true,
    discovery: true,
  },
  jobs: {
    show: true,
    bookmarks: [],
  },
  notifications: {
    show: true,
    last: null,
    read: [],
  },
  pinned: {
    show: false,
    pages: [],
  },
  quickbar: true,
  railDrawer: false,
  searches: {
    last: [],
    bookmarks: [],
  },
  slashSearch: false,
  theme: {
    name: 'light',
    mixedTheme: false,
    colors: {},
    dark: false,
  },
} as const

export const DEFAULT_USER = {
  v: 5,
  settings: merge({}, DEFAULT_SETTINGS),
}

export const useUserStore = defineStore('user', () => {
  const user = ref(merge({}, DEFAULT_USER))

  function load () {
    if (!IN_BROWSER) return

    const stored = localStorage.getItem('vuetify:one@user')
    const data = stored ? JSON.parse(stored) : null

    user.value.settings = merge({}, DEFAULT_SETTINGS, data?.settings ?? {})

    if (!data) save()
  }

  function save () {
    if (!IN_BROWSER) return

    localStorage.setItem('vuetify:one@user', JSON.stringify(user.value.settings, null, 2))
  }

  function reset () {
    if (!IN_BROWSER) return

    user.value.settings = merge({}, DEFAULT_SETTINGS)

    save()
  }

  load()

  return {
    ...toRefs(user.value),
    load,
    save,
    reset,
  }
})
