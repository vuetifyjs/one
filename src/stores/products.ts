// Types
import type { ComputedRef, Ref } from 'vue'

export interface ShopifyProduct {
  id: string
  title: string
  vendor: string
  product_type: string
  tags: string[]
  handle: string
  price: string
  image: string
}

export interface ProductsState {
  all: Ref<ShopifyProduct[]>
  themes: ComputedRef<ShopifyProduct[]>
  index: () => Promise<ShopifyProduct[]>
  randomize: (array: ShopifyProduct[]) => ShopifyProduct[]
}

export const useProductsStore = defineStore('products', (): ProductsState => {
  const http = useHttpStore()
  const queue = useQueueStore()
  const all = ref<ShopifyProduct[]>([])

  const themes = computed(() => all.value.filter(b => b.product_type === 'Themes'))

  async function index () {
    if (all.value.length > 0) {
      return all.value
    }

    try {
      const res = await http.get<{ products: ShopifyProduct[] }>('/one/shopify/products')

      all.value = res.products
    } catch (error: any) {
      queue.showError(error.message)
    }

    return all.value
  }

  function randomize (array: ShopifyProduct[]): ShopifyProduct[] {
    return array.slice().sort(() => Math.random() - 0.5)
  }

  return {
    all,
    themes,
    index,
    randomize,
  }
})
