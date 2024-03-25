// Stores
import { useHttpStore } from './http'

// Types
export interface Sponsor {
  metadata: {
    tier: number
  }
  slug: string
  title: string
}

export type RootState = {
  sponsors: Sponsor[]
}

export const useSponsorsStore = defineStore('sponsors', () => {
  const sponsors = ref<Sponsor[]>([])
  const all = ref<Sponsor[]>([])
  const aall = ref<Sponsor[]>([])
  const isLoading = ref(false)

  const http = useHttpStore()

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ sponsors: Sponsor[] }>('/one/sponsors')

      all.value = res.sponsors
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  async function admin () {
    try {
      isLoading.value = true

      const res = await http.get<{ sponsors: Sponsor[] }>('/one/admin/sponsors')

      aall.value = res.sponsors
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return aall.value
  }

  onServerPrefetch(index)
  onBeforeMount(index)

  const byTier = computed(() => {
    const tiers: Record<string, Sponsor[]> = {}

    for (const sponsor of sponsors.value) {
      const tier = sponsor.metadata.tier

      if (!tiers[tier]) {
        tiers[tier] = []
      }

      tiers[tier].push(sponsor)
    }

    return tiers
  })

  function bySlug (slug: string) {
    return sponsors.value.find(sponsor => {
      return sponsor.slug === slug
    })
  }

  return {
    isLoading,
    all,
    aall,
    sponsors,
    byTier,

    bySlug,

    admin,
  }
})
