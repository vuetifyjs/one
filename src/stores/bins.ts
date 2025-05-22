// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

export type VOneBin = {
  id: string
  content: string
  favorite: boolean
  pinned: boolean
  owner: Record<string, unknown>
  visibility: 'private' | 'public'
}

export interface BinsState {
  isLoading: ShallowRef<boolean>
  pinned: ComputedRef<VOneBin[]>
  favorites: ComputedRef<VOneBin[]>
  all: Ref<VOneBin[]>
  index: () => Promise<VOneBin[]>
}

export const useBinsStore = defineStore('bins', (): BinsState => {
  const http = useHttpStore()
  const queue = useQueueStore()

  const all = ref<VOneBin[]>([])
  const isLoading = shallowRef(false)

  const favorites = computed(() => all.value.filter(b => b.favorite))
  const pinned = computed(() => all.value.filter(b => b.pinned))

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ bins: VOneBin[] }>('/one/bins')

      all.value = res.bins
    } catch (error: any) {
      queue.showError(error?.message ?? 'An unexpected error has occurred')
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
