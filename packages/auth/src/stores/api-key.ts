import { computed, ref, shallowRef, readonly } from 'vue'
import { defineStore } from 'pinia'
import { useHttpStore } from './http'
import type { VOneAccessToken } from '../types'

export const useApiKeyStore = defineStore('auth-api-key', () => {
  const http = useHttpStore()

  const accessToken = ref<VOneAccessToken | null>(null)
  const regenerated = shallowRef(false)

  const key = computed(() => accessToken.value?.apiKey || '')

  const trim = computed(() => {
    if (!key.value) {
      return ''
    }
    const apiKey = key.value
    return `${apiKey.slice(0, 6)}...${apiKey.slice(-6)}`
  })

  async function generate (regenerate = false): Promise<VOneAccessToken> {
    if (!regenerated.value && regenerate) {
      regenerated.value = true
    }

    const slug = regenerate ? 'regenerate' : 'generate'
    const token = regenerate
      ? await http.post<VOneAccessToken>(`/one/mcp/${slug}`)
      : await http.fetch<VOneAccessToken>(`/one/mcp/${slug}`)
    accessToken.value = token
    return token
  }

  async function fetch (): Promise<VOneAccessToken | null> {
    try {
      const res = await http.fetch<VOneAccessToken>('/one/mcp/getToken')
      if (res?.apiKey) {
        accessToken.value = res
        return res
      }
      return null
    } catch {
      return null
    }
  }

  return {
    accessToken: readonly(accessToken),
    key: readonly(key),
    regenerated: readonly(regenerated),
    trim: readonly(trim),
    generate,
    fetch,
  }
})

export type ApiKeyStore = ReturnType<typeof useApiKeyStore>
