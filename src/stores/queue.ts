import type { Ref } from 'vue'
import { defineStore } from 'pinia'

export type Snackbar = string | Record<string, any>

export interface QueueState {
  queue: Ref<Snackbar[]>
  show: (text: Snackbar) => void
  showError: (text: Snackbar) => void
}

export const useQueueStore = defineStore('queue', (): QueueState => {
  const queue = ref<Snackbar[]>([])

  function show (text: Snackbar) {
    const record = typeof text === 'string' ? { text } : text

    queue.value.push(record)
  }

  function showError (text: Snackbar) {
    show({
      color: 'error',
      text,
      location: 'top end',
      timeout: -1,
    })
  }

  return {
    queue,
    show,
    showError,
  }
})
