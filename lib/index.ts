// Components
import VoAuthBtn from '@/components/auth/VoAuthBtn.vue'
import VoAuthCard from '@/components/auth/VoAuthCard.vue'
import VoAuthDialog from '@/components/auth/VoAuthDialog.vue'
import VoNotificationsBanner from '@/components/notifications/VoNotificationsBanner.vue'
import VoAuthListItem from '@/components/auth/VoAuthListItem.vue'
import VoSpot from '@/components/spots/VoSpot.vue'
import VoFooter from '@/components/app/VoFooter.vue'

// Types
import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'

// Stores
export { useAuthStore } from '@/stores/auth'
export { useBannersStore } from '@/stores/banners'
export { useBinsStore } from '@/stores/bins'
export { useHttpStore } from '@/stores/http'
export { useOneStore } from '@/stores/one'
export { useUserStore } from '@/stores/user'
export { useSettingsStore } from '@/stores/settings'
export { useSpotsStore } from '@/stores/spots'

export function createOne () {
  function install (app: App) {
    app.component('VoAuthBtn', VoAuthBtn)
    app.component('VoAuthCard', VoAuthCard)
    app.component('VoAuthDialog', VoAuthDialog)
    app.component('VoAuthListItem', VoAuthListItem)
    app.component('VoNotificationsBanner', VoNotificationsBanner)
    app.component('VoSpot', VoSpot)
    app.component('VoFooter', VoFooter)
  }

  return { install }
}

export function one (id: string[], url: string) {
  return function (context: PiniaPluginContext) {
    const store = context.store

    store.url = url

    if (store.$id !== 'site') return

    store.id = id
  }
}
