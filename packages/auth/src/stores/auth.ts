import { computed, ref, shallowRef } from 'vue'
import { defineStore } from 'pinia'
import { useHttpStore } from './http'
import type {
  AuthCallbacks,
  AuthProvider,
  AuthVerifyResponse,
  VOneIdentity,
  VOneUser,
} from '../types'

const IN_BROWSER = typeof window !== 'undefined'

export interface AuthStoreState {
  user: VOneUser | null
  isLoading: boolean
  isAuthenticated: boolean
  isSuper: boolean
  isAdmin: boolean
  isEditor: boolean
}

export const useAuthStore = defineStore('auth', () => {
  const http = useHttpStore()

  const dialog = ref(false)
  const user = ref<VOneUser | null>(null)
  const isLoading = shallowRef(false)
  const callbacks = ref<AuthCallbacks>({})

  const isAuthenticated = computed(() => !!user.value)
  const isSuper = computed(() => user.value?.role === 'super')
  const isAdmin = computed(() => ['super', 'admin'].includes(user.value?.role ?? ''))
  const isEditor = computed(() => ['super', 'admin', 'editor'].includes(user.value?.role ?? ''))

  function setCallbacks (cbs: AuthCallbacks) {
    callbacks.value = cbs
  }

  async function verify (force = false): Promise<AuthVerifyResponse | null> {
    if ((verify as any).promise) {
      return (verify as any).promise
    }

    // Skip if no URL configured
    if (!http.url) {
      user.value = null
      return null
    }

    if (
      !force
      && !document.cookie.includes('sx=1')
      && location.hostname?.match(/([^.]+\.[^.]+)$/)?.[1]
      === new URL(http.url).hostname.match(/([^.]+\.[^.]+)$/)?.[1]
    ) {
      user.value = null
      return null
    }

    isLoading.value = true

    const fetchPromise = fetch(`${http.url}/auth/verify`, {
      credentials: 'include',
      cache: force ? 'reload' : undefined,
    })

    // Guard against fetch returning undefined (can happen in tests)
    if (!fetchPromise || typeof fetchPromise.then !== 'function') {
      isLoading.value = false
      user.value = null
      return null
    }

    ;(verify as any).promise = fetchPromise.then(
      async res => {
        if (res.ok || res.status === 401) {
          const data: AuthVerifyResponse = await res.json()
          user.value = data.user

          callbacks.value.onAuth?.(data)

          return data
        } else {
          console.error(res.statusText)
          return null
        }
      },
      error => {
        callbacks.value.onError?.(error)
        return null
      },
    ).finally(() => {
      isLoading.value = false
      ;(verify as any).promise = null
    })

    return (verify as any).promise
  }

  async function login (provider: AuthProvider = 'github') {
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
      isLoading.value = false
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
          dialog.value = false
        }

        user.value = e.data.body.user

        callbacks.value.onAuth?.({
          user: e.data.body.user,
          access: e.data.body.access ?? [],
        })
      } else {
        console.error(e.data.message)
        callbacks.value.onError?.(new Error(e.data.message))
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
      user.value = null
    } catch (error: any) {
      callbacks.value.onError?.(error)
    } finally {
      isLoading.value = false
    }
  }

  function findIdentity (provider: string): VOneIdentity | undefined {
    return user.value?.identities.find(i => i.provider === provider)
  }

  function lastLoginProvider (): string | null {
    if (!IN_BROWSER) {
      return null
    }
    return localStorage.getItem('vuetify@lastLoginProvider')
  }

  if (IN_BROWSER) {
    verify()
  }

  return {
    // State
    user,
    dialog,
    isLoading,

    // Computed
    isAuthenticated,
    isSuper,
    isAdmin,
    isEditor,

    // Actions
    setCallbacks,
    verify,
    login,
    logout,
    findIdentity,
    lastLoginProvider,
  }
})

export type AuthStore = ReturnType<typeof useAuthStore>
