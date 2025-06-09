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

    if (user.one.banners.last) {
      const last = new Date(user.one.banners.last)
      const ago = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)

      if (last > ago) {
        return undefined
      }
    }

    return all.value.find(({
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
      if (
        (_site.includes('dev') && import.meta.env.MODE === 'development')
        || _site.includes('*')
      ) {
        return true
      }

      return _site.some(s => site.id.includes(s))
    })
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
