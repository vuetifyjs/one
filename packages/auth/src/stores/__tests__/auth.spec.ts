/* eslint-disable unicorn/no-document-cookie */
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAuthStore } from '../auth'
import { useHttpStore } from '../http'

describe('auth store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
    localStorage.clear()
    // Clear cookies
    document.cookie = 'sx=; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  })

  describe('initial state', () => {
    it('has null user by default', () => {
      const auth = useAuthStore()
      expect(auth.user).toBeNull()
    })

    it('is not authenticated by default', () => {
      const auth = useAuthStore()
      expect(auth.isAuthenticated).toBe(false)
    })

    it('is not loading by default', () => {
      const auth = useAuthStore()
      expect(auth.isLoading).toBe(false)
    })

    it('has dialog closed by default', () => {
      const auth = useAuthStore()
      expect(auth.dialog).toBe(false)
    })
  })

  describe('computed permissions', () => {
    it('isSuper is true when user role is super', () => {
      const auth = useAuthStore()
      auth.user = { role: 'super' } as any
      expect(auth.isSuper).toBe(true)
    })

    it('isAdmin is true for super and admin roles', () => {
      const auth = useAuthStore()

      auth.user = { role: 'super' } as any
      expect(auth.isAdmin).toBe(true)

      auth.user = { role: 'admin' } as any
      expect(auth.isAdmin).toBe(true)

      auth.user = { role: 'user' } as any
      expect(auth.isAdmin).toBe(false)
    })

    it('isEditor is true for super, admin, and editor roles', () => {
      const auth = useAuthStore()

      auth.user = { role: 'super' } as any
      expect(auth.isEditor).toBe(true)

      auth.user = { role: 'admin' } as any
      expect(auth.isEditor).toBe(true)

      auth.user = { role: 'editor' } as any
      expect(auth.isEditor).toBe(true)

      auth.user = { role: 'user' } as any
      expect(auth.isEditor).toBe(false)
    })
  })

  describe('verify', () => {
    it('skips fetch when no session cookie and same domain', async () => {
      const http = useHttpStore()
      http.url = 'https://vuetifyjs.com'

      // Mock location to be same domain
      vi.stubGlobal('location', { hostname: 'vuetifyjs.com' })

      const mockFetch = vi.fn()
      vi.stubGlobal('fetch', mockFetch)

      const auth = useAuthStore()
      await auth.verify()

      expect(mockFetch).not.toHaveBeenCalled()
      expect(auth.user).toBeNull()
    })

    it('fetches when session cookie is present', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      // Set session cookie
      document.cookie = 'sx=1'

      const mockUser = {
        id: '123',
        name: 'Test User',
        role: 'user',
      }

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, access: ['one'] }),
      }))

      const auth = useAuthStore()
      const result = await auth.verify(true)

      expect(result).toEqual({ user: mockUser, access: ['one'] })
      expect(auth.user).toEqual(mockUser)
    })

    it('sets user to null on 401', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      document.cookie = 'sx=1'

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: () => Promise.resolve({ user: null, access: [] }),
      }))

      const auth = useAuthStore()
      await auth.verify(true)

      expect(auth.user).toBeNull()
    })

    it('calls onAuth callback with response', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      document.cookie = 'sx=1'

      const mockUser = { id: '123', name: 'Test', role: 'user' }
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: mockUser, access: ['one'] }),
      }))

      const onAuth = vi.fn()
      const auth = useAuthStore()
      auth.setCallbacks({ onAuth })

      await auth.verify(true)

      expect(onAuth).toHaveBeenCalledWith({ user: mockUser, access: ['one'] })
    })

    it('deduplicates concurrent verify calls', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      document.cookie = 'sx=1'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ user: { id: '1' }, access: [] }),
      })
      vi.stubGlobal('fetch', mockFetch)

      const auth = useAuthStore()

      // Call verify multiple times concurrently
      const [r1, r2, r3] = await Promise.all([
        auth.verify(true),
        auth.verify(true),
        auth.verify(true),
      ])

      // Should only have made one fetch call
      expect(mockFetch).toHaveBeenCalledTimes(1)
      // All should return the same result
      expect(r1).toEqual(r2)
      expect(r2).toEqual(r3)
    })
  })

  describe('logout', () => {
    it('posts to logout endpoint and clears user', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      const mockPost = vi.fn().mockResolvedValue({})
      vi.spyOn(http, 'post').mockImplementation(mockPost)

      const auth = useAuthStore()
      auth.user = { id: '123' } as any

      await auth.logout()

      expect(mockPost).toHaveBeenCalledWith('/auth/logout')
      expect(auth.user).toBeNull()
    })

    it('posts to identity-specific logout when identity provided', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      const mockPost = vi.fn().mockResolvedValue({})
      vi.spyOn(http, 'post').mockImplementation(mockPost)

      const auth = useAuthStore()
      await auth.logout('github')

      expect(mockPost).toHaveBeenCalledWith('/auth/github/logout')
    })

    it('calls onError callback on failure', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      const error = new Error('Logout failed')
      vi.spyOn(http, 'post').mockRejectedValue(error)

      const onError = vi.fn()
      const auth = useAuthStore()
      auth.setCallbacks({ onError })

      await auth.logout()

      expect(onError).toHaveBeenCalledWith(error)
    })
  })

  describe('findIdentity', () => {
    it('returns identity matching provider', () => {
      const auth = useAuthStore()
      auth.user = {
        identities: [
          { provider: 'github', userId: 'gh123' },
          { provider: 'discord', userId: 'dc456' },
        ],
      } as any

      const github = auth.findIdentity('github')
      expect(github?.userId).toBe('gh123')

      const discord = auth.findIdentity('discord')
      expect(discord?.userId).toBe('dc456')
    })

    it('returns undefined when no match', () => {
      const auth = useAuthStore()
      auth.user = {
        identities: [{ provider: 'github', userId: 'gh123' }],
      } as any

      expect(auth.findIdentity('google')).toBeUndefined()
    })

    it('returns undefined when user is null', () => {
      const auth = useAuthStore()
      expect(auth.findIdentity('github')).toBeUndefined()
    })
  })

  describe('lastLoginProvider', () => {
    it('returns null when nothing stored', () => {
      const auth = useAuthStore()
      expect(auth.lastLoginProvider()).toBeNull()
    })

    it('returns stored provider', () => {
      localStorage.setItem('vuetify@lastLoginProvider', 'github')
      const auth = useAuthStore()
      expect(auth.lastLoginProvider()).toBe('github')
    })
  })

  describe('login', () => {
    it('opens popup for non-shopify providers', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      const mockOpen = vi.fn().mockReturnValue({
        location: { href: '' },
        closed: false,
        close: vi.fn(),
      })
      vi.stubGlobal('open', mockOpen)

      const auth = useAuthStore()
      auth.login('github')

      // Wait a tick for the popup to be configured
      await new Promise(resolve => setTimeout(resolve, 10))

      expect(mockOpen).toHaveBeenCalledWith(
        '',
        'vuetify:authorize:popup',
        expect.stringContaining('popup'),
      )
    })

    it('redirects for shopify provider', async () => {
      const http = useHttpStore()
      http.url = 'https://api.vuetifyjs.com'

      const mockAssign = vi.fn()
      vi.stubGlobal('location', {
        href: 'https://vuetifyjs.com/current',
        assign: mockAssign,
      })

      const auth = useAuthStore()
      await auth.login('shopify')

      expect(mockAssign).toHaveBeenCalledWith(
        expect.stringContaining('/auth/shopify/redirect'),
      )
    })
  })
})
