// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

export type VOnePlay = {
  id: string
  slug: string
  createdAt: string
  updatedAt: string
  title: string
  favorite: boolean
  pinned: boolean
  locked: boolean
  owner: Record<string, unknown>
  visibility: 'private' | 'public'
}

export interface PlaysState {
  isLoading: ShallowRef<boolean>
  pinned: ComputedRef<VOnePlay[]>
  favorites: ComputedRef<VOnePlay[]>
  all: Ref<VOnePlay[]>
  index: () => Promise<VOnePlay[]>
}

export const usePlaysStore = defineStore('plays', (): PlaysState => {
  const http = useHttpStore()
  const queue = useQueueStore()

  const all = ref<VOnePlay[]>([])
  const isLoading = shallowRef(false)

  const favorites = computed(() => all.value.filter(p => p.favorite))
  const pinned = computed(() => all.value.filter(p => p.pinned))

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ playgrounds: VOnePlay[] }>('/one/playgrounds')

      all.value = res.playgrounds
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error fetching playgrounds')
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    isLoading,
    pinned,
    favorites,
    all,
    index,
  }
})
