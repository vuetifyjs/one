import { defineStore } from 'pinia'
import { computed, onBeforeMount, ref, shallowRef } from 'vue'
import { useHttpStore } from './http'

// Types
type CosmicImage = {
  url: string
}

interface Promotion {
  id: string
  slug: string
  title: string
  metadata: {
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
    type: string
  }
}

export const usePromotionsStore = defineStore('promotions', () => {
  const http = useHttpStore()
  const isLoading = shallowRef(false)
  const all = ref<Promotion[]>([])

  const discoverable = computed(() => {
    return all.value.filter(promotion => promotion.metadata.discoverable)
  })

  function random (array: Promotion[]) {
    return array[Math.floor(Math.random() * array.length)]
  }

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ promotions: Promotion[] }>('/one/promotions')

      all.value = res.promotions
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  function show (slug: string) {
    return all.value.find(promotion => promotion.slug === slug)
  }

  onBeforeMount(index)

  return {
    all,
    discoverable,

    index,
    random,
    show,
  }
})
