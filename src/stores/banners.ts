// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

// Types
export interface VOneBanner {
  id: string
  status: 'published' | 'draft'
  created_at: string
  modified_at: string
  slug: string
  title: string
  metadata: {
    active: boolean
    closable: boolean
    priority?: number | { key: string; value: string }
    color: string
    label: string
    height: number
    text: string
    subtext: string
    link: string
    link_text: string
    link_color: string
    attributes: Record<string, any>
    start_date: string
    end_date: string
    bg_blur: number | null
    images: {
      bg: {
        url: string
      } | null
      logo: {
        url: string
      } | null
    }
    site: ('*' | 'dev' | 'vbin' | 'vplay' | 'docs' | 'home' | 'server')[]
  }
}

interface BannerState {
  all: Ref<VOneBanner[]>
  isLoading: ShallowRef<boolean>
  server: ComputedRef<VOneBanner | undefined>
  banner: ComputedRef<VOneBanner | undefined>
  index: () => Promise<VOneBanner[]>
}

export const useBannersStore = defineStore('banners', (): BannerState => {
  const http = useHttpStore()
  const site = useSiteStore()
  const user = useUserStore()
  const queue = useQueueStore()

  const all = ref<VOneBanner[]>([])
  const isLoading = shallowRef(false)

  const banner = computed(() => {
    if (server.value) {
      return server.value
    }
    if (!user.one.banners.enabled) {
      return undefined
    }

    // Cooldown: 3 days since last banner interaction
    if (user.one.banners.last) {
      const last = new Date(user.one.banners.last)
      const cooldownMs = 3 * 24 * 60 * 60 * 1000 // 3 days
      const ago = new Date(Date.now() - cooldownMs)

      if (last > ago) {
        return undefined
      }
    }

    // Filter eligible banners
    const eligible = all.value.filter(({
      slug,
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) {
        return false
      }
      if (user.one.banners.read.includes(slug)) {
        return false
      }
      // In dev mode, show all banners regardless of site
      if (import.meta.env.MODE === 'development') {
        return true
      }
      if (_site.includes('*')) {
        return true
      }

      return _site.some(s => site.id.includes(s))
    })

    // Sort by priority (high first), then by created_at (newest first)
    const sorted = eligible.sort((a, b) => {
      // Handle priority as number, string, or CosmicJS object { key, value }
      const getPriority = (p: any) => {
        if (typeof p === 'number') return p
        if (typeof p === 'string') return Number(p) || 0
        if (p && typeof p === 'object' && 'key' in p) return Number(p.key) || 0
        return 0
      }
      const priorityA = getPriority(a.metadata.priority)
      const priorityB = getPriority(b.metadata.priority)
      if (priorityB !== priorityA) {
        return priorityB - priorityA
      }
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    })

    return sorted[0]
  })

  const server = computed(() => {
    return all.value.find(({
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) {
        return false
      }

      return _site.includes('server')
    })
  })

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ banners: VOneBanner[] }>('/one/banners')

      all.value = res.banners
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error fetching banners')
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    all,
    isLoading,
    server,
    banner,
    index,
  }
})
