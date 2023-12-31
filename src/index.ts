// Components
import VoAuthDialog from '@/components/VoAuthDialog.vue'
import VoFooter from '@/components/VoFooter.vue'

// Types
import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'

// Stores
export { useAuthStore } from '@/store/auth'
export { useBinsStore } from '@/store/bins'
export { useHttpStore } from '@/store/http'
export { useOneStore } from '@/store/one'
export { useUserStore } from '@/store/user'

export function createOne () {
  function install (app: App) {
    app.component('VoAuthDialog', VoAuthDialog)
    app.component('VoFooter', VoFooter)
  }

  return { install }
}

export function one (ctx: PiniaPluginContext) {
  ctx.store.url = import.meta.env.VITE_API_SERVER_URL
}
