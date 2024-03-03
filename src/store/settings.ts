import { defineStore } from 'pinia'

import { useAuthStore } from './auth'
import { useUserStore } from './user'

import { computed } from 'vue'

export interface Suit {
  'app-bar': string
  'navigation-drawer': string
  footer: string
}

export interface State {
  suit: Suit | {}
}

const CDN_URL = 'https://cdn.vuetifyjs.com/docs/images/one/suits/'

export const useSettingsStore = defineStore('settings', () => {
  const auth = useAuthStore()
  const user = useUserStore()

  const suits = {
    blackguard: {
      'app-bar': CDN_URL + 'blackguard/blackguard-app-bar.png',
      'navigation-drawer': CDN_URL + 'blackguard/blackguard-app-drawer.png',
      footer: '',
    },
    // polaris: {
    //   'app-bar': '',
    //   'navigation-drawer': '',
    //   footer: '',
    // },
    // nebula: {
    //   'app-bar': '',
    //   'navigation-drawer': '',
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

  return {
    suit,
  } satisfies State
})
