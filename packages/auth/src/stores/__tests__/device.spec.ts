import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useDeviceStore } from '../device'
import { useAuthStore } from '../auth'
import { useHttpStore } from '../http'

describe('device store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('has null deviceCode by default', () => {
      const device = useDeviceStore()
      expect(device.deviceCode).toBeNull()
    })

    it('has idle status by default', () => {
      const device = useDeviceStore()
      expect(device.status).toBe('idle')
    })

    it('has null error by default', () => {
      const device = useDeviceStore()
      expect(device.error).toBeNull()
    })
  })

  describe('authorize', () => {
    it('requires authentication', async () => {
      const device = useDeviceStore()
      const result = await device.authorize('ABC123')

      expect(result).toBe(false)
      expect(device.error).toBe('Must be authenticated to authorize device')
    })

    it('posts to authorize endpoint when authenticated', async () => {
      const http = useHttpStore()
      const auth = useAuthStore()

      // Mock authenticated user
      auth.user = { id: '123', role: 'user' } as any

      vi.spyOn(http, 'post').mockResolvedValue({})

      const device = useDeviceStore()
      const result = await device.authorize('ABC123')

      expect(http.post).toHaveBeenCalledWith('/auth/device/ABC123/authorize')
      expect(result).toBe(true)
      expect(device.status).toBe('authorized')
    })

    it('sets error status on failure', async () => {
      const http = useHttpStore()
      const auth = useAuthStore()

      auth.user = { id: '123', role: 'user' } as any

      vi.spyOn(http, 'post').mockRejectedValue(new Error('Code expired'))

      const device = useDeviceStore()
      const result = await device.authorize('ABC123')

      expect(result).toBe(false)
      expect(device.status).toBe('error')
      expect(device.error).toBe('Code expired')
    })

    it('sets pending status while authorizing', async () => {
      const http = useHttpStore()
      const auth = useAuthStore()

      auth.user = { id: '123', role: 'user' } as any

      let resolvePost: (value: any) => void
      vi.spyOn(http, 'post').mockImplementation(() => new Promise(resolve => {
        resolvePost = resolve
      }))

      const device = useDeviceStore()
      const promise = device.authorize('ABC123')

      expect(device.status).toBe('pending')

      resolvePost!({})
      await promise

      expect(device.status).toBe('authorized')
    })
  })

  describe('getStatus', () => {
    it('fetches status from endpoint', async () => {
      const http = useHttpStore()
      vi.spyOn(http, 'get').mockResolvedValue({ status: 'pending' })

      const device = useDeviceStore()
      const result = await device.getStatus('ABC123')

      expect(http.get).toHaveBeenCalledWith('/auth/device/ABC123/status')
      expect(result).toBe('pending')
    })

    it('returns error status on failure', async () => {
      const http = useHttpStore()
      vi.spyOn(http, 'get').mockRejectedValue(new Error('Not found'))

      const device = useDeviceStore()
      const result = await device.getStatus('ABC123')

      expect(result).toBe('error')
    })
  })

  describe('reset', () => {
    it('resets all state', async () => {
      const http = useHttpStore()
      const auth = useAuthStore()

      auth.user = { id: '123', role: 'user' } as any
      vi.spyOn(http, 'post').mockRejectedValue(new Error('Failed'))

      const device = useDeviceStore()

      // Put store in error state
      await device.authorize('ABC123')
      expect(device.status).toBe('error')
      expect(device.error).toBe('Failed')

      // Reset
      device.reset()

      expect(device.deviceCode).toBeNull()
      expect(device.status).toBe('idle')
      expect(device.error).toBeNull()
    })
  })
})
