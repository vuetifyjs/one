// Pinia
import { defineStore } from 'pinia'

// Composables
import { ref } from 'vue'

// Stores
import { useHttpStore } from './http'

type Bin = {
  id?: string
  content: string
  visibility: 'private' | 'public'
}

export const useBinsStore = defineStore('bins', () => {
  const http = useHttpStore()

  const all = ref<Bin[]>([])
  const current = ref<Bin>()

  async function get () {
    const res = await http.get<{ bins: Bin[] }>('/one/bins')

    all.value = res.bins
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
    current.value = res.bin

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
    all,
    create,
    current,
    find,
    get,
    update,
    updateOrCreate,
  }
})
