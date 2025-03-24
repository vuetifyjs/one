import { defineStore } from 'pinia'

// Utilities
import { Ref, ref } from 'vue'

export interface SiteState {
  id: Ref<string[]>
  url: Ref<string>
}

export const useSiteStore = defineStore('site', () => {
  const id = ref([])
  const url = ref()

  return {
    id,
    url,
  } as SiteState
})
