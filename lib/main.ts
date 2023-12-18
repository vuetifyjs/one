// Components
import VoAuthDialog from '../src/components/VoAuthDialog.vue'
import VoFooter from '../src/components/VoFooter.vue'

// Types
import type { App } from 'vue'

// Stores
export { useAuthStore } from '../src/store/auth'
export { useOneStore } from '../src/store/one'
export { useUserStore } from '../src/store/user'

export function createOne () {
  function install (app: App) {
    app.component('VoAuthDialog', VoAuthDialog)
    app.component('VoFooter', VoFooter)
  }

  return { install }
}
