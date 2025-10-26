// Types
import type { Ref, ShallowRef } from 'vue'
import type { VOneTeam } from './team'

export interface VOneSponsorship {
  id: string
  platform: string
  interval: 'month' | 'year' | 'once'
  target: string
  tierName: string
  amount: number
  isActive: boolean
  createdAt: Date
}

export interface VOneIdentity {
  id: string
  emails: string[]
  provider: string
  userId: string
  userHandle: string
  primary: boolean
}

export interface VOneUser {
  id: string
  isAdmin: boolean
  role: 'super' | 'admin' | 'editor' | 'user'
  name: string
  picture: string
  settings: Record<string, any> | null
  createdAt: string
  identities: VOneIdentity[]
  sponsorships: VOneSponsorship[]
  team: VOneTeam
}

export interface AuthState {
  user: Ref<VOneUser | null>
  url: string
  dialog: Ref<boolean>
  isLoading: ShallowRef<boolean>
  verify: (force?: boolean) => Promise<void>
  findIdentity: (provider: string) => VOneIdentity | undefined
  login: (provider?: 'github' | 'discord' | 'shopify') => Promise<void>
  logout: (identity?: string) => Promise<void>
  lastLoginProvider: () => string | null
  sync: () => Promise<void>
}

export const useAuthStore = defineStore('auth', (): AuthState => {
  const dialog = ref(false)
  const user = ref<VOneUser | null>(null)
  const http = useHttpStore()
  const userStore = useUserStore()
  const router = useRouter()
  const isLoading = shallowRef(false)
  const one = useOneStore()
  const team = useTeamStore()
  const queue = useQueueStore()

  let externalUpdate = !!lastLoginProvider()
  watch(user, user => {
    if (!user?.settings) {
      return
    }

    const local = localStorage.getItem('vuetify@user') || '{}'

    if (JSON.stringify(user.settings, null, 2) === local) {
      return
    }

    externalUpdate = true

    Object.assign(userStore, user.settings)
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

  async function verify (force = false) {
    if (verify.promise) {
      return verify.promise
    }

    if (
      !force
      && !document.cookie.includes('sx=1')
      // This check only works if the api and site are on the same domain
      && location.hostname.match(/([^.]+\.[^.]+)$/)?.[1]
      === new URL(http.url).hostname.match(/([^.]+\.[^.]+)$/)?.[1]
    ) {
      // Session cookie isn't set, don't even bother fetching
      user.value = null
      return
    }

    isLoading.value = true

    verify.promise = fetch(`${http.url}/auth/verify`, {
      credentials: 'include',
      cache: force ? 'reload' : undefined,
    }).then(
      async res => {
        if (res.ok || res.status === 401) {
          const data = await res.json()
          user.value = data.user
          one.access = data.access
          team.team = data.user?.team
        } else {
          console.error(res.statusText)
        }
      },
      () => {},
    ).finally(() => {
      isLoading.value = false
      verify.promise = null
    })
  }

  verify.promise = null as Promise<void> | null

  async function login (provider: 'github' | 'discord' | 'shopify' = 'github') {
    isLoading.value = true

    const redirectUrl = `${http.url}/auth/${provider}/redirect`

    if (provider === 'shopify') {
      window.location.assign(redirectUrl + '?next=' + encodeURIComponent(window.location.href))
      return
    }

    const width = 400
    const height = 600
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2

    const ctx = window.open(
      '',
      'vuetify:authorize:popup',
      `popup,left=${left},top=${top},width=${width},height=${height},resizable`,
    )

    if (!ctx) {
      console.error('Failed to open popup')
      return
    }

    ctx.location.href = redirectUrl

    let interval = -1
    let timeout = -1

    function messageHandler (e: MessageEvent) {
      if (e.origin !== http.url) {
        return
      }
      if (e.data?.type !== 'auth-response') {
        return
      }
      if (e.data.status === 'success') {
        if (!user.value) {
          localStorage.setItem('vuetify@lastLoginProvider', provider)
        }
        user.value = e.data.body.user
        one.access = e.data.body.access
        team.team = e.data.body.user?.team
        sync()
      } else {
        console.error(e.data.message)
      }

      cleanup()
    }

    function cleanup () {
      window.removeEventListener('message', messageHandler)
      window.clearInterval(interval)
      window.clearTimeout(timeout)
      ctx?.close()

      isLoading.value = false
    }

    window.addEventListener('message', messageHandler)
    interval = window.setInterval(() => {
      if (!ctx || ctx.closed) {
        console.error('Auth popup closed')
        cleanup()
      } else {
        ctx.postMessage({ type: 'auth-request' }, '*')
      }
    }, 1000)
    timeout = window.setTimeout(() => {
      cleanup()
      console.error('Auth timed out')
    }, 120 * 1000)
  }

  async function logout (identity?: string) {
    isLoading.value = true

    const url = identity ? `/auth/${identity}/logout` : '/auth/logout'

    try {
      await http.post(url)
      await verify(true)
      user.value = null
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error logging out')
    } finally {
      router.push({
        path: '/',
        query: router.currentRoute.value.query,
      })
      isLoading.value = false
    }
  }

  function findIdentity (provider: string) {
    return user.value?.identities.find(i => i.provider === provider)
  }

  function lastLoginProvider () {
    return localStorage.getItem('vuetify@lastLoginProvider')
  }

  verify()

  return {
    user,
    url: http.url,
    dialog,
    isLoading,
    verify,
    findIdentity,
    login,
    logout,
    lastLoginProvider,
    sync,
  }
})
