// Stores
import { useHttpStore } from './http'

// Types
import type { ComputedRef, Ref } from 'vue'

export interface Sponsor {
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
  all: Ref<Sponsor[]>
  aall: Ref<Sponsor[]>
  record: Ref<Sponsor | undefined>
  sponsors: Ref<Sponsor[]>
  byTier: ComputedRef<Record<string, Sponsor[]>>
  bySlug: (slug: string) => Sponsor | undefined
  admin: () => Promise<Sponsor[]>
  index: () => Promise<Sponsor[]>
  show: (id: string) => Promise<Sponsor>
  store: (data: FormData) => Promise<Sponsor>
  update: (id: string, data: FormData) => Promise<Sponsor>
  destroy: () => Promise<void>
}

export const DEFAULT_SPONSOR: Sponsor = {
  id: '',
  status: 'draft',
  modified_at: '',
  created_at: '',
  slug: '',
  title: '',
  metadata: {
    active: false,
    href: '',
    start_date: null,
    level: null,
    source: 'None',
    name: '',
    tier: '',
    end_date: null,
    logodark: null,
    logolight: null,
  },
}

export const useSponsorsStore = defineStore('sponsors', () => {
  const sponsors = ref<Sponsor[]>([])
  const all = ref<Sponsor[]>([])
  const aall = ref<Sponsor[]>([])
  const isLoading = ref(false)
  const record = ref<Sponsor | null>()

  const http = useHttpStore()

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

  onServerPrefetch(index)
  onBeforeMount(index)

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

  async function show (id: string) {
    try {
      isLoading.value = true

      const res = await http.get<{ sponsor: Sponsor }>(`/one/admin/sponsors/${id}`)

      record.value = res.sponsor

      return res.sponsor
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function store (data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ sponsor: Sponsor }>(
        '/one/admin/sponsors',
        data,
      )

      record.value = res.sponsor

      return res.sponsor
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function update (id: string, data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ sponsor: Sponsor }>(
        `/one/admin/sponsors/${id}`,
        data,
      )

      record.value = res.sponsor

      return res.sponsor
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function destroy () {}

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
    record,

    bySlug,

    admin,
    index,
    show,
    store,
    update,
    destroy,
  } as SponsorState
})
