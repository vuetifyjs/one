import { defineStore } from 'pinia'

// Utilities
import type { Ref } from 'vue'
import { ref } from 'vue'

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
