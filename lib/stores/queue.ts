import { defineStore } from 'pinia'
import { Ref } from 'vue'

export type Snackbar = Record<string, any>

export interface State {
  queue: Ref<Snackbar[]>
  show: (text: Record<string, any> | string) => void
}

export const useQueueStore = defineStore('Queue', () => {
  const queue = ref<Snackbar[]>([])

  function show (text: Snackbar) {
    const record = typeof text === 'string' ? { text } : text

    queue.value.push(record)
  }

  return {
    queue,
    show,
  } as State
})
