// Re-export types from @vuetify/auth
// Import the base auth store
import {
  useAuthStore as useBaseAuthStore,
  useHttpStore,
  type AuthVerifyResponse,
} from '@vuetify/auth'
import { merge } from 'lodash-es'
import { DEFAULT_USER, useUserStore } from './user'
import { migrateV6ToV7 } from './migrations'
import type { VOneTeam } from './team'

export type {
  AuthProvider,
  VOneIdentity,
  VOneRole,
  VOneSponsorship,
  VOneTeamMember,
  VOneUser,
} from '@vuetify/auth'

// Globals
const IN_BROWSER = typeof window !== 'undefined'

/**
 * Extended auth store for @vuetify/one
 * Wraps @vuetify/auth and adds Vuetify One specific integrations
 */
export const useAuthStore = defineStore('auth', () => {
  const baseAuth = useBaseAuthStore()
  const http = useHttpStore()
  const userStore = useUserStore()
  const router = useRouter()
  const one = useOneStore()
  const team = useTeamStore()
  const queue = useQueueStore()

  // Proxy state from base auth
  const user = toRef(() => baseAuth.user)
  const dialog = toRef(() => baseAuth.dialog)
  const isLoading = toRef(() => baseAuth.isLoading)
  const isAuthenticated = toRef(() => baseAuth.isAuthenticated)
  const isSuper = toRef(() => baseAuth.isSuper)
  const isAdmin = toRef(() => baseAuth.isAdmin)
  const isEditor = toRef(() => baseAuth.isEditor)

  let externalUpdate = !!baseAuth.lastLoginProvider()

  // Watch for user changes and sync settings
  watch(user, user => {
    if (!IN_BROWSER || !user?.settings) {
      return
    }

    const local = localStorage.getItem('vuetify@user') || '{}'

    if (JSON.stringify(user.settings, null, 2) === local) {
      return
    }

    externalUpdate = true

    // Migrate server settings if needed and merge with defaults
    let settings = user.settings
    if (settings.version === 6) {
      settings = migrateV6ToV7(settings)
    }
    const merged = {
      version: 7,
      ecosystem: merge(structuredClone(DEFAULT_USER.ecosystem), settings.ecosystem || {}),
      one: merge(structuredClone(DEFAULT_USER.one), settings.one || {}),
    }
    Object.assign(userStore, merged)
  })

  userStore.$subscribe(() => {
    if (!externalUpdate) {
      sync()
    }

    externalUpdate = false
  })

  async function sync () {
    await nextTick()

    if (!user.value || !userStore.one.sync) {
      return
    }

    try {
      await http.post('/user/settings', { settings: userStore.$state })
      await verify(true)
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error syncing settings')
    }
  }

  // Set up callbacks for One-specific integrations
  baseAuth.setCallbacks({
    onAuth: (response: AuthVerifyResponse) => {
      one.access = response.access
      if (response.user?.team) {
        // The user's team from auth response is a partial type
        // The team store expects the full type from /one/team endpoint
        // We only set team.team if it has the full structure
        const userTeam = response.user.team as VOneTeam & { inviteCode?: string, members?: any[], owner?: any }
        if (userTeam.inviteCode && userTeam.members && userTeam.owner) {
          team.team = userTeam as VOneTeam
        }
      }
    },
    onError: (error: Error) => {
      queue.showError(error.message ?? 'Authentication error')
    },
  })

  async function verify (force = false) {
    return baseAuth.verify(force)
  }

  async function login (provider: 'github' | 'discord' | 'shopify' | 'google' | 'opencollective' = 'github') {
    await baseAuth.login(provider)

    // After successful login (handled by callback), navigate and sync
    if (baseAuth.user) {
      baseAuth.dialog = false
      router.push('/user/dashboard')
      sync()
    }
  }

  async function logout (identity?: string) {
    await baseAuth.logout(identity)

    router.push({
      path: '/',
      query: router.currentRoute.value.query,
    })
  }

  function findIdentity (provider: string) {
    return baseAuth.findIdentity(provider)
  }

  function lastLoginProvider () {
    return baseAuth.lastLoginProvider()
  }

  return {
    // State (proxied from base)
    user,
    url: http.url,
    dialog,
    isLoading,
    isAuthenticated,
    isSuper,
    isAdmin,
    isEditor,

    // Actions
    verify,
    findIdentity,
    login,
    logout,
    lastLoginProvider,
    sync,
  }
})
