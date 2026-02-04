import { shallowRef } from 'vue'

export function useCopy (timeout = 1000) {
  const copied = shallowRef(false)

  async function copy (text: string) {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => copied.value = false, timeout)
  }

  return { copied, copy }
}
