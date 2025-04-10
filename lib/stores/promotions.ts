import { defineStore } from 'pinia'
import { computed, onBeforeMount, ref, shallowRef } from 'vue'
import { useHttpStore } from './http'

// Types
type CosmicImage = {
  url: string
} | null

export interface Promotion {
  id: string
  slug: string
  title: string
  metadata: {
    active: boolean
    color: string
    text: string
    short_text: string
    images: {
      default: CosmicImage
      logolight: CosmicImage
      logodark: CosmicImage
      bgdark: CosmicImage
      bglight: CosmicImage
    }
    url: string
    discoverable: boolean
    advertisement: boolean
    startdate: string | null
    enddate: string | null
    price: number
    type: 'theme' | 'video' | 'book' | 'course' | 'website' | 'job' | 'merch' | 'digital' | 'services' | 'documentation'
  }
}

export const DEFAULT_PROMOTION: Promotion = {
  id: '',
  slug: 'default',
  title: '',
  metadata: {
    active: false,
    color: '',
    text: 'Enter an advertisement message here',
    short_text: 'Short text is for Highlighted Promotions.',
    images: {
      default: { url: '' },
      logolight: { url: '' },
      logodark: { url: '' },
      bgdark: { url: '' },
      bglight: { url: '' },
    },
    url: '',
    discoverable: false,
    advertisement: false,
    startdate: null,
    enddate: null,
    price: 0,
    type: 'website',
  },
}

export const usePromotionsStore = defineStore('promotions', () => {
  const http = useHttpStore()

  const all = ref<Promotion[]>([])
  const aall = ref<Promotion[]>([])
  const record = ref<Promotion | null>()
  const isLoading = shallowRef(false)
  const hasLoaded = shallowRef(false)

  const discoverable = computed(() => {
    return all.value.filter(promotion => promotion.metadata.discoverable)
  })

  onBeforeMount(index)

  function random (array: Promotion[]) {
    const _array = array.filter(promotion => promotion.metadata.active)

    return _array[Math.floor(Math.random() * _array.length)]
  }

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ promotions: Promotion[] }>('/one/promotions')

      all.value = res.promotions
    } catch {
      //
    } finally {
      isLoading.value = false
      hasLoaded.value = true
    }

    return all.value
  }

  async function show (id: string) {
    try {
      isLoading.value = true

      const res = await http.get<{ promotion: Promotion }>(`/one/admin/promotions/${id}`)

      record.value = res.promotion

      return res.promotion
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function store (data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ promotion: Promotion }>(
        '/one/admin/promotions',
        data,
      )

      record.value = res.promotion

      return res.promotion
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function update (id: string, data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ promotion: Promotion }>(
        `/one/admin/promotions/${id}`,
        data,
      )

      record.value = res.promotion

      return res.promotion
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function destroy () {}

  async function admin () {
    try {
      isLoading.value = true

      const res = await http.get<{ promotions: Promotion[] }>('/one/admin/promotions')

      aall.value = res.promotions
    } catch {
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
    hasLoaded,
    discoverable,
    record,

    admin,
    destroy,
    index,
    random,
    show,
    store,
    update,
  }
})
