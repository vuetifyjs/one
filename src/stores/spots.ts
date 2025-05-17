// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

// Types
export interface VOneSpot {
  id: string
  status: 'published' | 'draft'
  modified_at: string
  created_at: string
  slug: string
  title: string
  metadata: {
    active: boolean
    // change to link
    href: string
    start_date: string
    sponsor: string
    site: ('*' | 'dev' | 'vbin' | 'vplay' | 'docs' | 'home' | 'server')[]
    end_date: string
    image: {
      url: string
    } | null
  }
}

export interface SpotState {
  all: Ref<VOneSpot[]>
  isLoading: ShallowRef<boolean>
  spot: ComputedRef<VOneSpot | undefined>
  index: () => Promise<VOneSpot[]>
}

export const useSpotsStore = defineStore('spots', (): SpotState => {
  const http = useHttpStore()
  const site = useSiteStore()
  const queue = useQueueStore()

  const all = ref<VOneSpot[]>([])
  const isLoading = shallowRef(false)

  const spot = computed(() => {
    return all.value.find(({
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) {
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

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ spots: VOneSpot[] }>('/one/spots')

      all.value = res.spots
    } catch (error: any) {
      queue.showError(error.message)
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    all,
    isLoading,
    spot,
    index,
  }
})
