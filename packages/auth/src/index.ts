// Stores
export {
  useHttpStore,
  useAuthStore,
  useApiKeyStore,
  useDeviceStore,
  type AuthStore,
  type AuthStoreState,
  type ApiKeyStore,
  type DeviceStore,
  type DeviceAuthStatus,
  type DeviceCode,
} from './stores'

// Types
export type {
  VOneUser,
  VOneIdentity,
  VOneSponsorship,
  VOneRole,
  VOneTeam,
  VOneTeamMember,
  VOneAccessToken,
  AuthProvider,
  AuthConfig,
  AuthCallbacks,
  AuthVerifyResponse,
} from './types'

// Plugin
import type { App } from 'vue'
import type { Pinia, PiniaPluginContext } from 'pinia'
import type { AuthConfig } from './types'
import { useHttpStore } from './stores'

export interface AuthPluginOptions extends AuthConfig {}

/**
 * Creates a Pinia plugin that configures the auth stores with the API URL
 */
export function createAuthPlugin(options: AuthPluginOptions) {
  return function authPlugin(context: PiniaPluginContext) {
    if (context.store.$id === 'auth-http') {
      context.store.url = options.apiUrl
    }
  }
}

/**
 * Vue plugin for @vuetify/auth
 * Automatically configures the HTTP store with the API URL
 */
export function createAuth(options: AuthPluginOptions) {
  return {
    install(app: App) {
      // The actual configuration happens via the Pinia plugin
      // This is a convenience wrapper
    },
    piniaPlugin: createAuthPlugin(options),
  }
}
