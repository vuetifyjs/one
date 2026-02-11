// Components
import VoAppBar from '@/components/app/VoAppBar.vue'
import VoScript from '@/components/app/VoScript.vue'
import VoSocialFooter from '@/components/app/VoSocialFooter.vue'
import VoAuthBtn from '@/components/auth/VoAuthBtn.vue'
import VoAuthCard from '@/components/auth/VoAuthCard.vue'
import VoAuthDialog from '@/components/auth/VoAuthDialog.vue'
import VoAuthListItem from '@/components/auth/VoAuthListItem.vue'
import VoNotificationsBanner from '@/components/notifications/VoNotificationsBanner.vue'
import VoPromotionsCardHighlight from '@/components/promotions/VoPromotionsCardHighlight.vue'
import VoPromotionsCardVuetify from '@/components/promotions/VoPromotionsCardVuetify.vue'

import VoPromotionsFooter from '@/components/promotions/VoPromotionsFooter.vue'
import VoSpot from '@/components/spots/VoSpot.vue'

// Types
import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'

// Icons
export { aliases } from '@/icons'

export type { VOneIdentity, VOneRole, VOneSponsorship, VOneUser } from '@/stores/auth'
// Stores
export { useAuthStore } from '@/stores/auth'

export type { VOneBanner } from '@/stores/banners'
export { useBannersStore } from '@/stores/banners'
export type { VOneBin } from '@/stores/bins'
export { useBinsStore } from '@/stores/bins'
export type { VOneSendowlDownload, VOneSendowlDownloadItem } from '@/stores/downloads'
export { useDownloadsStore } from '@/stores/downloads'
export { useHttpStore } from '@/stores/http'
export type { CreateLinkOptions, VOneLink } from '@/stores/links'
export { useLinksStore } from '@/stores/links'
export type { VOneNotification } from '@/stores/notifications'
export { useNotificationsStore } from '@/stores/notifications'
export { useOneStore } from '@/stores/one'
export type { VOnePlay } from '@/stores/plays'

export { usePlaysStore } from '@/stores/plays'

export type { ShopifyProduct } from '@/stores/products'
export { useProductsStore } from '@/stores/products'
export type { VOnePromotion } from '@/stores/promotions'
export { usePromotionsStore } from '@/stores/promotions'
export { useQueueStore } from '@/stores/queue'
export type { VOneSuit } from '@/stores/settings'
export { useSettingsStore } from '@/stores/settings'
export { useSiteStore } from '@/stores/site'
export type { VOneSponsor } from '@/stores/sponsors'
export { useSponsorsStore } from '@/stores/sponsors'
export type { VOneSpot } from '@/stores/spots'
export { useSpotsStore } from '@/stores/spots'
export type { VOneTeam } from '@/stores/team'
export { useTeamStore } from '@/stores/team'
export { useUserStore } from '@/stores/user'
// Re-export from @vuetify/auth
export {
  type AuthConfig,
  type AuthPluginOptions,
  createAuth,
  createAuthPlugin,
  type DeviceAuthStatus,
  type DeviceCode,
  useApiKeyStore,
  useDeviceStore,
  type VOneAccessToken,
} from '@vuetify/auth'

export function createOne () {
  function install (app: App) {
    app.component('VoAppBar', VoAppBar)
    app.component('VoAuthBtn', VoAuthBtn)
    app.component('VoAuthCard', VoAuthCard)
    app.component('VoAuthDialog', VoAuthDialog)
    app.component('VoAuthListItem', VoAuthListItem)
    app.component('VoNotificationsBanner', VoNotificationsBanner)
    app.component('VoPromotionsCardHighlight', VoPromotionsCardHighlight)
    app.component('VoPromotionsCardVuetify', VoPromotionsCardVuetify)
    app.component('VoPromotionsFooter', VoPromotionsFooter)
    app.component('VoScript', VoScript)
    app.component('VoSocialFooter', VoSocialFooter)
    app.component('VoSpot', VoSpot)
  }

  return { install }
}

export function one (id: string[], url: string) {
  return function (context: PiniaPluginContext) {
    const store = context.store

    if (store.$id === 'http') {
      store.url = url
      return
    }

    if (store.$id !== 'site') {
      return
    }

    store.id = id
  }
}
