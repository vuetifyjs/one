// Composables
import { useRouter } from 'vue-router'

// Utilities
import { defineStore } from 'pinia'
import { computed, ref, shallowRef, watch } from 'vue'

// Stores
import { useHttpStore } from '@/stores/http'
import { useUserStore } from '@/stores/user'

export interface Sponsorship {
  id: string
  platform: string
  interval: 'month' | 'year'
  target: string
  tierName: string
  amount: number
  isActive: boolean
  createdAt: Date
}

export interface User {
  id: string
  isAdmin: boolean
  name: string
  picture: string
  settings: Record<string, any> | null
  createdAt: string
  identities: {
    id: string
    emails: string[]
    provider: string
    userId: string
    userHandle: string
    primary: boolean
  }[]
  sponsorships: Sponsorship[]
}

export const useAuthStore = defineStore('auth', () => {
  const dialog = ref(false)
  const user = ref<User | null>(null)
  const http = useHttpStore()
  const userStore = useUserStore()
  const router = useRouter()
  const isLoading = shallowRef(false)

  const isSubscriber = computed(() => (
    !http.url ||
    user.value?.isAdmin ||
    !!user.value?.sponsorships.some(s => s.isActive)
  ))

  let externalUpdate = !!lastLoginProvider()
  watch(user, user => {
    if (!user?.settings) return

    const local = localStorage.getItem('vuetify@user') || '{}'

    if (JSON.stringify(user.settings, null, 2) === local) return

    externalUpdate = true

    Object.assign(userStore, user.settings)
  })

  userStore.$subscribe(() => {
    if (!externalUpdate) sync()

    externalUpdate = false
  })

  async function sync () {
    if (!user.value || !userStore.syncSettings) return

    try {
      await http.post('/user/settings', { settings: userStore.$state })
    } catch (err: any) {
      console.error(err)
    }
  }

  async function verify (force = false) {
    if (verify.promise) return verify.promise

    isLoading.value = true

    verify.promise = fetch(`${http.url}/auth/verify`, {
      credentials: 'include',
      headers: force ? {
        'Cache-Control': 'no-cache',
      } : undefined,
    }).then(
      async res => {
        if (res.ok) {
          user.value = (await res.json()).user
        } else if (res.status === 401) {
          user.value = null
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
      window.location = redirectUrl + '?next=' + encodeURIComponent(window.location.href)
      return
    }

    const width = 400
    const height = 600
    const left = window.screenX + (window.innerWidth - width) / 2
    const top = window.screenY + (window.innerHeight - height) / 2

    const ctx = window.open(
      '',
      'vuetify:authorize:popup',
      `popup,left=${left},top=${top},width=${width},height=${height},resizable`
    )

    if (!ctx) {
      console.error('Failed to open popup')
      return
    }

    ctx.location.href = redirectUrl

    let interval = -1
    let timeout = -1
    function messageHandler (e: MessageEvent) {
      if (e.origin !== http.url) return
      if (e.data?.type !== 'auth-response') return
      if (e.data.status === 'success') {
        if (!user.value) {
          localStorage.setItem('vuetify@lastLoginProvider', provider)
        }
        user.value = e.data.body.user
        router.push({
          path: '/user/dashboard/',
          query: router.currentRoute.value.query,
        })
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
    } catch (err: any) {
      console.error(err)
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
    findIdentity,
    verify,
    login,
    logout,
    isSubscriber,
    lastLoginProvider,
    sync,
  }
})
