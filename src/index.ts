// Components
import VoAuthBtn from '@/components/auth/VoAuthBtn.vue'
import VoAuthListItem from '@/components/auth/VoAuthListItem.vue'
import VoFooter from '@/components/app/VoFooter.vue'

// Types
import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'

// Stores
export { useAuthStore } from '@/store/auth'
export { useBinsStore } from '@/store/bins'
export { useHttpStore } from '@/store/http'
export { useOneStore } from '@/store/one'
export { useUserStore } from '@/store/user'
export { useSettingsStore } from '@/store/settings'

export function createOne () {
  function install (app: App) {
    app.component('VoAuthBtn', VoAuthBtn)
    app.component('VoAuthListItem', VoAuthListItem)
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
