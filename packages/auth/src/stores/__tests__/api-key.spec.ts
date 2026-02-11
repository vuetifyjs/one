import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useApiKeyStore } from '../api-key'
import { useHttpStore } from '../http'

describe('api-key store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  describe('initial state', () => {
    it('has null accessToken by default', () => {
      const apiKey = useApiKeyStore()
      expect(apiKey.accessToken).toBeNull()
    })

    it('has empty key by default', () => {
      const apiKey = useApiKeyStore()
      expect(apiKey.key).toBe('')
    })

    it('has regenerated as false by default', () => {
      const apiKey = useApiKeyStore()
      expect(apiKey.regenerated).toBe(false)
    })
  })

  describe('computed trim', () => {
    it('returns empty string when no key', () => {
      const apiKey = useApiKeyStore()
      expect(apiKey.trim).toBe('')
    })

    it('returns trimmed key with ellipsis', async () => {
      const http = useHttpStore()
      vi.spyOn(http, 'fetch').mockResolvedValue({
        id: '1',
        apiKey: 'abcdef123456789ghijkl',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      })

      const apiKey = useApiKeyStore()
      await apiKey.fetch()

      expect(apiKey.trim).toBe('abcdef...ghijkl')
    })
  })

  describe('generate', () => {
    it('generates new token via GET', async () => {
      const http = useHttpStore()
      const mockToken = {
        id: '1',
        apiKey: 'new-api-key-12345',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      vi.spyOn(http, 'fetch').mockResolvedValue(mockToken)

      const apiKey = useApiKeyStore()
      const result = await apiKey.generate()

      expect(http.fetch).toHaveBeenCalledWith('/one/mcp/generate')
      expect(result).toEqual(mockToken)
      expect(apiKey.accessToken).toEqual(mockToken)
    })

    it('regenerates token via POST when regenerate=true', async () => {
      const http = useHttpStore()
      const mockToken = {
        id: '1',
        apiKey: 'regenerated-key-67890',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-02',
      }
      vi.spyOn(http, 'post').mockResolvedValue(mockToken)

      const apiKey = useApiKeyStore()
      const result = await apiKey.generate(true)

      expect(http.post).toHaveBeenCalledWith('/one/mcp/regenerate')
      expect(result).toEqual(mockToken)
      expect(apiKey.regenerated).toBe(true)
    })

    it('sets regenerated flag only once', async () => {
      const http = useHttpStore()
      vi.spyOn(http, 'post').mockResolvedValue({
        id: '1',
        apiKey: 'key',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      })

      const apiKey = useApiKeyStore()

      await apiKey.generate(true)
      expect(apiKey.regenerated).toBe(true)

      // Second regenerate shouldn't change the flag
      await apiKey.generate(true)
      expect(apiKey.regenerated).toBe(true)
    })
  })

  describe('fetch', () => {
    it('fetches existing token', async () => {
      const http = useHttpStore()
      const mockToken = {
        id: '1',
        apiKey: 'existing-key',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      vi.spyOn(http, 'fetch').mockResolvedValue(mockToken)

      const apiKey = useApiKeyStore()
      const result = await apiKey.fetch()

      expect(http.fetch).toHaveBeenCalledWith('/one/mcp/getToken')
      expect(result).toEqual(mockToken)
      expect(apiKey.accessToken).toEqual(mockToken)
    })

    it('returns null when response has no apiKey', async () => {
      const http = useHttpStore()
      vi.spyOn(http, 'fetch').mockResolvedValue({})

      const apiKey = useApiKeyStore()
      const result = await apiKey.fetch()

      // When response has no apiKey, returns null and accessToken stays null
      expect(result).toBeNull()
      expect(apiKey.accessToken).toBeNull()
    })

    it('returns null on error', async () => {
      const http = useHttpStore()
      vi.spyOn(http, 'fetch').mockRejectedValue(new Error('Not found'))

      const apiKey = useApiKeyStore()
      const result = await apiKey.fetch()

      expect(result).toBeNull()
    })
  })
})
