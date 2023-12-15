// Components
import VoAuthDialog from '../src/components/VoAuthDialog.vue'

// Types
import type { App } from 'vue'

// Stores
export { useAuthStore } from '../src/store/auth'
export { useOneStore } from '../src/store/one'
export { useUserStore } from '../src/store/user'

export function install (app: App) {
  app.component('VoAuthDialog', VoAuthDialog)
}
