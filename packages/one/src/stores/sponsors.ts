// Types
import type { ComputedRef, Ref } from 'vue'

export interface VOneSponsor {
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
    start_date: string | null
    source: string
    name: string
    level: {
      key: string
      value: string
    } | null
    tier: string
    end_date: string | null
    logodark: {
      url: string
    } | null
    logolight: {
      url: string
    } | null
  }
}

export type SponsorState = {
  isLoading: Ref<boolean>
  all: Ref<VOneSponsor[]>
  sponsors: Ref<VOneSponsor[]>
  byTier: ComputedRef<Record<string, VOneSponsor[]>>
  bySlug: (slug: string) => VOneSponsor | undefined
  index: () => Promise<VOneSponsor[]>
}

export const useSponsorsStore = defineStore('sponsors', (): SponsorState => {
  const http = useHttpStore()
  const queue = useQueueStore()

  const sponsors = ref<VOneSponsor[]>([])
  const all = ref<VOneSponsor[]>([])
  const isLoading = ref(false)

  const byTier = computed(() => {
    const tiers: Record<string, VOneSponsor[]> = {}

    for (const sponsor of sponsors.value) {
      const tier = sponsor.metadata.tier

      if (!tiers[tier]) {
        tiers[tier] = []
      }

      tiers[tier].push(sponsor)
    }

    return tiers
  })

  onServerPrefetch(index)
  onBeforeMount(index)

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ sponsors: VOneSponsor[] }>('/one/sponsors')

      all.value = res.sponsors
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error fetching sponsors')
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  function bySlug (slug: string) {
    return sponsors.value.find(sponsor => {
      return sponsor.slug === slug
    })
  }

  return {
    isLoading,
    all,
    sponsors,
    byTier,
    bySlug,
    index,
  }
})
