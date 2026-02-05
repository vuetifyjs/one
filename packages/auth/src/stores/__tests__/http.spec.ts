import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useHttpStore } from '../http'

describe('http store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.restoreAllMocks()
  })

  it('has empty url by default', () => {
    const http = useHttpStore()
    expect(http.url).toBe('')
  })

  it('can set url', () => {
    const http = useHttpStore()
    http.url = 'https://api.example.com'
    expect(http.url).toBe('https://api.example.com')
  })

  describe('fetch', () => {
    it('makes request with credentials', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      })
      vi.stubGlobal('fetch', mockFetch)

      await http.fetch('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({ credentials: 'include' }),
      )
    })

    it('returns parsed JSON on success', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      }))

      const result = await http.fetch('/test')
      expect(result).toEqual({ data: 'test' })
    })

    it('returns empty object on 204 No Content', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
      }))

      const result = await http.fetch('/test')
      expect(result).toEqual({})
    })

    it('throws error with message from JSON response', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        text: () => Promise.resolve(JSON.stringify({ message: 'Bad request' })),
      }))

      await expect(http.fetch('/test')).rejects.toThrow('Bad request')
    })

    it('throws error with text response when not JSON', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
        text: () => Promise.resolve('Internal Server Error'),
      }))

      await expect(http.fetch('/test')).rejects.toThrow('Internal Server Error')
    })

    it('throws error with status code when no body', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        text: () => Promise.resolve(''),
      }))

      await expect(http.fetch('/test')).rejects.toThrow('HTTP 404')
    })
  })

  describe('post', () => {
    it('sends JSON body with POST method', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({}),
      })
      vi.stubGlobal('fetch', mockFetch)

      await http.post('/test', { foo: 'bar' })

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ foo: 'bar' }),
        }),
      )
    })
  })

  describe('get', () => {
    it('makes GET request', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ data: 'test' }),
      })
      vi.stubGlobal('fetch', mockFetch)

      const result = await http.get('/test')

      expect(result).toEqual({ data: 'test' })
    })
  })

  describe('delete', () => {
    it('sends DELETE method', async () => {
      const http = useHttpStore()
      http.url = 'https://api.example.com'

      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        status: 204,
      })
      vi.stubGlobal('fetch', mockFetch)

      await http.delete('/test')

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({ method: 'DELETE' }),
      )
    })
  })
})
