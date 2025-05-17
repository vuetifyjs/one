// Types
type CosmicImage = {
  url: string
} | null

export interface VOnePromotion {
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

export const usePromotionsStore = defineStore('promotions', () => {
  const http = useHttpStore()
  const queue = useQueueStore()

  const all = ref<VOnePromotion[]>([])
  const isLoading = shallowRef(false)
  const hasLoaded = shallowRef(false)

  const discoverable = computed(() => {
    return all.value.filter(promotion => promotion.metadata.discoverable)
  })

  onBeforeMount(index)

  function random (array: VOnePromotion[]) {
    const _array = array.filter(promotion => promotion.metadata.active)

    return _array[Math.floor(Math.random() * _array.length)]
  }

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ promotions: VOnePromotion[] }>('/one/promotions')

      all.value = res.promotions
    } catch (error: any) {
      queue.showError(error.message)
    } finally {
      isLoading.value = false
      hasLoaded.value = true
    }

    return all.value
  }

  return {
    all,
    isLoading,
    hasLoaded,
    discoverable,
    index,
    random,
  }
})
