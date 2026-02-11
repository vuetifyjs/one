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
  type HttpStore,
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
 * Creates a Pinia plugin that configures the auth stores with the API URL.
 *
 * @remarks
 * The auth store does NOT auto-verify on creation. Consumers must call
 * `useAuthStore().verify()` explicitly after the Pinia plugin has
 * configured the HTTP store URL. This prevents requests to unconfigured
 * endpoints and gives consumers control over timing.
 */
export function createAuthPlugin (options: AuthPluginOptions) {
  return function authPlugin (context: PiniaPluginContext) {
    if (context.store.$id === 'http') {
      context.store.url = options.apiUrl
    }
  }
}

/**
 * Creates auth configuration for a Vue + Pinia app.
 *
 * Returns a Pinia plugin that configures the HTTP base URL.
 * After installing, call `useAuthStore().verify()` to check session state.
 *
 * @example
 * ```ts
 * const pinia = createPinia()
 * pinia.use(createAuth({ apiUrl: 'https://api.vuetifyjs.com' }))
 *
 * // After app mount:
 * const auth = useAuthStore()
 * await auth.verify()
 * ```
 */
export function createAuth (options: AuthPluginOptions) {
  const plugin = createAuthPlugin(options)

  return {
    install: (_app: App) => { /* noop — configuration handled by Pinia plugin */ },
    piniaPlugin: plugin,
  }
}
