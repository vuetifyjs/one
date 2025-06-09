interface AccessToken {
  id: string
  apiKey: string
  createdAt: string
  updatedAt: string
}

export const useApiKeyStore = defineStore('api-key', () => {
  const http = useHttpStore()
  const accessToken = ref<AccessToken | null>(null)
  const regenerated = shallowRef(false)

  const key = computed(() => accessToken.value?.apiKey || '')

  const trim = computed(() => {
    if (!key.value) {
      return ''
    }
    const apiKey = key.value
    return `${apiKey.slice(0, 6)}...${apiKey.slice(-6)}`
  })

  async function generate (regenerate = false) {
    if (!regenerated.value && regenerate) {
      regenerated.value = true
    }

    const slug = regenerate ? 'regenerate' : 'generate'
    const token = await http[regenerate ? 'post' : 'fetch'](`/one/mcp/${slug}`)
    accessToken.value = token
    return token
  }

  async function fetch () {
    const res = await http.fetch('/one/mcp/getToken')
    if (res.apiKey) {
      accessToken.value = res
    }
    return res
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
