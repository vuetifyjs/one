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
  const isLoading = shallowRef(false)
  const timeout = shallowRef(-1)

  const isOwner = computed(() => {
    if (!auth.user || !current.value) return false

    return auth.user.id === current.value.owner.id
  })

  const favorites = computed(() => all.value.filter(b => b.favorite))
  const pinned = computed(() => all.value.filter(b => b.pinned))

  watch(current, () => {
    window.clearTimeout(timeout.value)

    timeout.value = window.setTimeout(() => {
      if (!current.value || !isOwner.value) return

      update(current.value, current.value.id)
    }, 100)
  }, { deep: true })

  async function get () {
    try {
      isLoading.value = true

      const res = await http.get<{ bins: Bin[] }>('/one/bins')

      all.value = res.bins
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  async function _delete (id: string) {
    try {
      isLoading.value = true

      await http.delete(`/one/bins/${id}`)

      all.value = all.value.filter(b => b.id !== id)
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return true
  }

  async function create (bin: Bin) {
    try {
      isLoading.value = true

      const res = await http.post<{ bin: Bin }>('/one/bins', { bin })

      all.value.push(res.bin)
      current.value = res.bin

      return res
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return { bin }
  }

  async function update (bin: Bin, id: string) {
    try {
      isLoading.value = true

      const res = await http.post<{ bin: Bin }>(`/one/bins/${id}`, { bin })

      const index = all.value.findIndex(b => b.id === id)

      all.value.splice(index, 1, res.bin)
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return { bin }
  }

  async function updateOrCreate (bin: Bin, id?: string) {
    try {
      isLoading.value = true

      const res = id ? await update(bin, id) : await create(bin)

      current.value = res.bin
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return { bin }
  }

  async function find (id: string) {
    try {
      isLoading.value = true
      const res = await http.get<{ bin: Bin }>(`/one/bins/${id}`)

      current.value = res.bin
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return { bin: current.value }
  }

  return {
    isLoading,
    isOwner,
    pinned,
    favorites,
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
