import { defineStore } from 'pinia'

export interface SendowlDownloadItem {
  name: string
  url: string
  type: 'product'
  accessible: boolean
  downloadable: boolean
}

export interface SendowlDownload {
  id: number
  download_items: SendowlDownloadItem[]
  order_name: string
  created_at: string
  download_url: string
}

export const useDownloadsStore = defineStore('downloads', () => {
  const http = useHttpStore()
  const all = ref<SendowlDownload[]>([])
  const isLoading = shallowRef(false)

  async function index () {
    if (all.value.length > 0) {
      return all.value
    }

    isLoading.value = true

    try {
      const res = await http.get<{ downloads: SendowlDownload[] }>('/one/sendowl/downloads')

      all.value = res.downloads
    } catch {
      //
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
