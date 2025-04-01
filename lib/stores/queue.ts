import { defineStore } from 'pinia'
import { Ref } from 'vue'

export type Snackbar = Record<string, any>

export interface SnackbarQueueState {
  queue: Ref<Snackbar[]>
  show: (text: Record<string, any> | string) => void
  showError: (text: Record<string, any> |string) => void
}

export const useQueueStore = defineStore('Queue', () => {
  const queue = ref<Snackbar[]>([])

  function show (text: Snackbar) {
    const record = typeof text === 'string' ? { text } : text

    queue.value.push(record)
  }

  function showError (message: string) {
    show({
      color: 'error',
      text: message,
      location: 'top end',
      timeout: -1,
    })
  }

  return {
    queue,
    show,
    showError,
  } as SnackbarQueueState
})
