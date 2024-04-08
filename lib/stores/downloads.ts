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
}

export const useDownloadsStore = defineStore('downloads', () => {
  const http = useHttpStore()
  const all = ref<SendowlDownload[]>([])
  const isLoading = shallowRef(false)

  const downloads = computed(() => {
    return all.value.reduce((acc, download) => {
      for (const item of download.download_items) {
        if (!item.accessible || !item.downloadable) continue

        acc.push(item)
      }

      return acc
    }, [] as SendowlDownloadItem[])
  })

  async function index () {
    if (all.value.length) return all.value

    isLoading.value = true

    try {
      const res = await http.get<{ downloads: SendowlDownload[] }>('/one/sendowl/downloads')

      all.value = res.downloads
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    all,
    isLoading,
    downloads,

    index,
  }
})
