import { App } from 'vue'

// Components
import VoAuthDialog from '../src/components/VoAuthDialog.vue'

// Stores
import { useAuthStore } from '../src/store/auth'
import { useOneStore } from '../src/store/one'
import { useUserStore } from '../src/store/user'

export function install (app: App) {
  app.component('VoAuthDialog', VoAuthDialog)
}

export { useAuthStore, useOneStore, useUserStore }
