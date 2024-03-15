// Composables
import { useSiteStore } from './site'

// Utilities
import { defineStore } from 'pinia'
import { computed, ComputedRef, ref, Ref, shallowRef, ShallowRef } from 'vue'
import { useHttpStore } from './http'

// Types
export interface Spot {
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

interface State {
  all: Ref<Spot[]>
  aall: Ref<Spot[]>
  isLoading: ShallowRef<boolean>
  spot: ComputedRef<Spot | undefined>
  record: Ref<Spot | undefined>

  admin: () => Promise<Spot[]>
  index: () => Promise<Spot[]>
  show: (slug: string) => Promise<Spot>
  store: (data: FormData) => Promise<Spot>
  update: (slug: string, data: FormData) => Promise<Spot>
  destroy: (slug: string) => Promise<void>
}

export const DEFAULT_SPOT: Spot = {
  id: '',
  status: 'draft',
  modified_at: '',
  created_at: '',
  slug: '',
  title: '',
  metadata: {
    active: false,
    href: '',
    start_date: '',
    site: ['*'],
    sponsor: '',
    end_date: '',
    image: {
      url: '',
    },
  },
}

export const useSpotsStore = defineStore('spots', () => {
  const http = useHttpStore()
  const site = useSiteStore()

  const all = ref<Spot[]>([])
  const aall = ref<Spot[]>([])
  const record = ref<Spot | null>()
  const isLoading = shallowRef(false)

  const spot = computed(() => {
    if (record.value) return record.value

    return all.value.find(({
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) return false
      if (
        (_site.includes('dev') && import.meta.env.MODE === 'development') ||
        _site.includes('*')
      ) return true

      return _site.some(s => site.id.includes(s))
    })
  })

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ spots: Spot[] }>('/one/spots')

      all.value = res.spots
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

      const res = await http.get<{ spot: Spot }>(`/one/admin/spots/${id}`)

      record.value = res.spot

      return res.spot
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function store (data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ spot: Spot }>(
        '/one/admin/spots',
        data,
      )

      record.value = res.spot

      return res.spot
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function update (id: string, data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ spot: Spot }>(
        `/one/admin/spots/${id}`,
        data,
      )

      record.value = res.spot

      return res.spot
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

      const res = await http.get<{ spots: Spot[] }>('/one/admin/spots')

      aall.value = res.spots
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    all,
    aall,
    isLoading,
    spot,
    record,

    admin,
    index,
    show,
    store,
    update,
    destroy,
  } as State
})
