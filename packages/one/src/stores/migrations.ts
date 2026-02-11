import type { VOneSuit } from './settings'
import type { DataTableSortItem } from 'vuetify'

export type OldRootState = {
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
} | OldRootState

export interface EcosystemSettings {
  [key: string]: unknown
}

export interface RootState {
  version: 7
  ecosystem: {
    bin: EcosystemSettings & {
      wordWrap: boolean
      dashboard?: DashboardState
    }
    play: EcosystemSettings & {
      showErrors: boolean
      wordWrap: boolean
      dashboard?: DashboardState
    }
    studio: EcosystemSettings & {
      dashboard?: DashboardState
    }
    link: EcosystemSettings & {
      dashboard?: DashboardState
    }
    docs: EcosystemSettings & {
      api: 'link-only' | 'inline'
      composition: 'composition' | 'options'
      pins: {
        enabled: boolean
        pinned: string[]
      }
      mixedTheme: boolean
      favorites: string[]
      slashSearch: boolean
      railDrawer: boolean
    }
    mcp: EcosystemSettings & {
      seen: boolean
    }
  }
  one: {
    avatar: string
    ads: {
      enabled: boolean
      house: boolean
    }
    command: {
      //
    }
    theme: string
    direction: 'ltr' | 'rtl'
    colors: {
      primary: string
    }
    suits: {
      enabled: boolean
      elements: string[]
      suit: string
    }
    notifications: {
      enabled: boolean
      read: string[]
      last: string
    }
    banners: {
      enabled: boolean
      read: string[]
      last: string
    }
    quicklinks: boolean
    ecosystem: {
      pinned: string[]
      seen: boolean
    }
    sync: boolean
    devmode: boolean
  }
}

export interface DashboardState {
  [key: string]: any
  sortBy: DataTableSortItem[]
  itemsPerPage: number
}

const migrations = [
  (d: any) => {
    if (!d.v) {
      d.pwaRefresh = true
      if (typeof d.api === 'boolean') {
        d.api = d.api ? 'inline' : 'link-only'
      }
      if (typeof d.rtl === 'boolean') {
        d.direction = d.rtl ? 'rtl' : 'ltr'
        delete d.rtl
      }
      if (typeof d.theme === 'object') {
        d.mixedTheme = d.theme.mixed
        d.theme = d.theme.system ? 'system' : (d.theme.dark ? 'dark' : 'light')
      }
      if (Array.isArray(d.notifications)) {
        d.notifications = { read: d.notifications }
      }
      if (typeof d.last === 'object') {
        d.notifications = d.notifications || {}
        d.notifications.last = d.last
        delete d.last
      }
      d.v = 1
    }
    return d
  },
  (d: any) => {
    if (d.v === 1) {
      if (Array.isArray(d.composition)) {
        d.composition = 'composition'
      }
      if (!Array.isArray(d.notifications?.last?.banner)) {
        d.notifications = d.notifications || {}
        d.notifications.last = d.notifications.last || {}
        d.notifications.last.banner = []
      }
      d.v = 2
    }
    return d
  },
  (d: any) => {
    if (d.v === 2) {
      d.syncSettings = true
      d.disableAds = false
      d.v = 3
    }
    return d
  },
  (d: any) => {
    if (d.v === 3) {
      d.quickbar = false
      d.v = 4
    }
    return d
  },
  (d: any) => {
    if (d.v === 4) {
      d.suits = { show: false, elements: ['app-bar'], suit: '' }
      d.notifications = d.notifications || {}
      d.notifications.banners = true
      d.v = 5
    }
    return d
  },
]

function migrateV5ToV6 (v5Data: any) {
  return ({
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
        api: v5Data.api || 'link-only',
        composition: v5Data.composition || 'composition',
        pins: {
          enabled: v5Data.pins || false,
          pinned: Array.isArray(v5Data.pinned) ? v5Data.pinned.map((p: any) => p.name || p).filter(Boolean) : [],
        },
        mixedTheme: v5Data.mixedTheme ?? true,
        favorites: [],
        slashSearch: v5Data.slashSearch || false,
        railDrawer: v5Data.railDrawer || false,
      },
    },
    one: {
      avatar: v5Data.avatar || '',
      ads: {
        enabled: !v5Data.disableAds,
        house: v5Data.showHouseAds || false,
      },
      command: {},
      theme: v5Data.theme || 'system',
      direction: v5Data.direction || 'ltr',
      colors: {
        primary: v5Data.colors?.one || 'surface-light',
      },
      suits: {
        enabled: v5Data.suits?.show || false,
        elements: v5Data.suits?.elements || ['app-bar'],
        suit: v5Data.suits?.suit || '',
      },
      notifications: {
        enabled: v5Data.notifications?.show ?? true,
        read: v5Data.notifications?.read || [],
        last: '',
      },
      banners: {
        enabled: v5Data.notifications?.banners ?? true,
        read: v5Data.notifications?.last?.banner || [],
        last: '',
      },
      quicklinks: v5Data.quickbar || false,
      sync: v5Data.syncSettings ?? true,
      devmode: v5Data.dev || false,
    },
  })
}

export function migrateV6ToV7 (v6Data: any): RootState {
  return {
    ...v6Data,
    version: 7,
    ecosystem: {
      ...v6Data.ecosystem,
      mcp: {
        seen: false,
      },
    },
  }
}

export function migrateUserData (data: any): RootState {
  const migratedData = migrations.reduce((acc, migration) => migration(acc), data)
  const v6Data = migrateV5ToV6(migratedData)
  return migrateV6ToV7(v6Data)
}
