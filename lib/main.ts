import { App } from 'vue'

// Components
import VoAuthDialog from '../src/components/VoAuthDialog.vue'

// Stores
import { useAuthStore } from '../src/store/auth'
import { useUserStore } from '../src/store/user'

export function install (app: App) {
  app.component('VoAuthDialog', VoAuthDialog)
}

export { useAuthStore, useUserStore }
