// Types
import type { Ref, ShallowRef } from 'vue'

export interface VOneSendowlDownloadItem {
  name: string
  url: string
  type: 'product'
  accessible: boolean
  downloadable: boolean
}

export interface VOneSendowlDownload {
  id: number
  download_items: VOneSendowlDownloadItem[]
  order_name: string
  created_at: string
  download_url: string
}

export interface DownloadsState {
  all: Ref<VOneSendowlDownload[]>
  isLoading: ShallowRef<boolean>
  index: () => Promise<VOneSendowlDownload[]>
}

export const useDownloadsStore = defineStore('downloads', () => {
  const http = useHttpStore()
  const queue = useQueueStore()
  const all = ref<VOneSendowlDownload[]>([])
  const isLoading = shallowRef(false)

  async function index () {
    if (all.value.length > 0) {
      return all.value
    }

    isLoading.value = true

    try {
      const res = await http.get<{ downloads: VOneSendowlDownload[] }>('/one/sendowl/downloads')

      all.value = res.downloads
    } catch (error: any) {
      queue.showError(error?.message ?? 'An unexpected error has occurred')
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    all,
    isLoading,
    index,
  }
})
