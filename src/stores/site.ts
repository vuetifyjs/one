// Utilities
import type { Ref } from 'vue'

export interface SiteState {
  id: Ref<string[]>
  url: Ref<string>
}

export const useSiteStore = defineStore('site', (): SiteState => {
  const id = ref([])
  const url = ref()

  return {
    id,
    url,
  }
})
