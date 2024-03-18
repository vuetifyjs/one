// Components
import VoAuthBtn from '@/components/auth/VoAuthBtn.vue'
import VoAuthCard from '@/components/auth/VoAuthCard.vue'
import VoAuthDialog from '@/components/auth/VoAuthDialog.vue'
import VoAuthListItem from '@/components/auth/VoAuthListItem.vue'
import VoSocialFooter from '@/components/app/VoSocialFooter.vue'
import VoNotificationsBanner from '@/components/notifications/VoNotificationsBanner.vue'
import VoPromotionsCardHighlight from '@/components/promotions/VoPromotionsCardHighlight.vue'
import VoPromotionsCardVuetify from '@/components/promotions/VoPromotionsCardVuetify.vue'
import VoPromotionsFooter from '@/components/promotions/VoPromotionsFooter.vue'
import VoScript from '@/components/app/VoScript.vue'
import VoSpot from '@/components/spots/VoSpot.vue'

// Types
import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'

// Stores
export { useAuthStore } from '@/stores/auth'
export { useBannersStore } from '@/stores/banners'
export { useBinsStore } from '@/stores/bins'
export { useHttpStore } from '@/stores/http'
export { useOneStore } from '@/stores/one'
export { usePromotionsStore } from '@/stores/promotions'
export { useSettingsStore } from '@/stores/settings'
export { useSpotsStore } from '@/stores/spots'
export { useUserStore } from '@/stores/user'

export function createOne () {
  function install (app: App) {
    app.component('VoAuthBtn', VoAuthBtn)
    app.component('VoAuthCard', VoAuthCard)
    app.component('VoAuthDialog', VoAuthDialog)
    app.component('VoAuthListItem', VoAuthListItem)
    app.component('VoSocialFooter', VoSocialFooter)
    app.component('VoNotificationsBanner', VoNotificationsBanner)
    app.component('VoPromotionsCardHighlight', VoPromotionsCardHighlight)
    app.component('VoPromotionsCardVuetify', VoPromotionsCardVuetify)
    app.component('VoPromotionsFooter', VoPromotionsFooter)
    app.component('VoScript', VoScript)
    app.component('VoSpot', VoSpot)
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
