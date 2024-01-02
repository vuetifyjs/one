// Pinia
import { defineStore } from 'pinia'

// Composables
import { computed, ref, shallowRef, watch } from 'vue'

// Stores
import { useAuthStore } from './auth'
import { useHttpStore } from './http'

type Bin = {
  id: string
  content: string
  favorite: boolean
  pinned: boolean
  owner: Record<string, unknown>
  visibility: 'private' | 'public'
}

export const useBinsStore = defineStore('bins', () => {
  const auth = useAuthStore()
  const http = useHttpStore()

  const all = ref<Bin[]>([])
  const current = ref<Bin>()
  const timeout = shallowRef(-1)

  const isOwner = computed(() => {
    if (!auth.user || !current.value) return false

    return auth.user.id === current.value.owner.id
  })

  watch(() => current, () => {
    window.clearTimeout(timeout.value)

    timeout.value = window.setTimeout(() => {
      if (!current.value || !isOwner.value) return

      update(current.value, current.value.id)
    }, 100)
  }, { deep: true })

  async function get () {
    const res = await http.get<{ bins: Bin[] }>('/one/bins')

    all.value = res.bins

    return res.bins
  }

  async function _delete (id: string) {
    const res = await http.delete(`/one/bins/${id}`)

    all.value = all.value.filter(b => b.id !== id)

    return res
  }

  async function create (bin: Bin) {
    const res = await http.post<{ bin: Bin }>('/one/bins', { bin })

    all.value.push(res.bin)
    current.value = res.bin

    return res
  }

  async function update (bin: Bin, id: string) {
    const res = await http.post<{ bin: Bin }>(`/one/bins/${id}`, { bin })
    const index = all.value.findIndex(b => b.id === id)

    all.value.splice(index, 1, res.bin)

    return res
  }

  async function updateOrCreate (bin: Bin, id?: string) {
    const res = id ? await update(bin, id) : await create(bin)

    current.value = res.bin

    return res
  }

  async function find (id: string) {
    const res = await http.get<{ bin: Bin }>(`/one/bins/${id}`)

    current.value = res.bin

    return res
  }

  return {
    isOwner,
    all,
    create,
    delete: _delete,
    current,
    find,
    get,
    update,
    updateOrCreate,
  }
})
