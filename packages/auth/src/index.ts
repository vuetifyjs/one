// Plugin
import type { App } from 'vue'
import type { PiniaPluginContext } from 'pinia'
import type { AuthConfig } from './types'

export {
  type ApiKeyStore,
  type AuthStore,
  type AuthStoreState,
  type DeviceAuthStatus,
  type DeviceCode,
  type DeviceStore,
  useApiKeyStore,
  useAuthStore,
  useDeviceStore,
  useHttpStore,
} from './stores'

// Types
export type {
  AuthCallbacks,
  AuthConfig,
  AuthProvider,
  AuthVerifyResponse,
  VOneAccessToken,
  VOneIdentity,
  VOneRole,
  VOneSponsorship,
  VOneTeam,
  VOneTeamMember,
  VOneUser,
} from './types'

export interface AuthPluginOptions extends AuthConfig {}

/**
 * Creates a Pinia plugin that configures the auth stores with the API URL
 */
export function createAuthPlugin (options: AuthPluginOptions) {
  return function authPlugin (context: PiniaPluginContext) {
    if (context.store.$id === 'auth-http') {
      context.store.url = options.apiUrl
    }
  }
}

/**
 * Vue plugin for @vuetify/auth
 * Automatically configures the HTTP store with the API URL
 */
export function createAuth (options: AuthPluginOptions) {
  return {
    install (_app: App) {
      // The actual configuration happens via the Pinia plugin
      // This is a convenience wrapper
    },
    piniaPlugin: createAuthPlugin(options),
  }
}
