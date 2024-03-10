import { defineStore } from 'pinia'

// Composables
import { useSiteStore } from './site'
import { useUserStore } from './user'

// Utilities
import { computed, ComputedRef, ref, Ref, shallowRef, ShallowRef } from 'vue'
import { useHttpStore } from './http'

// Types
export interface Banner {
  id: string
  status: 'published' | 'unpublished'
  created_at: string
  modified_at: string
  slug: string
  title: string
  metadata: {
    active: boolean
    closable: boolean
    color: string
    label: string
    height: number
    text: string
    subtext: string
    link: string
    link_text: string
    link_color: string
    attributes: Record<string, any>
    start_date: string
    end_date: string
    theme: {
      key: 'light' | 'dark'
      value: 'Light' | 'Dark'
    }
    images: {
      bg: {
        url: string
      }
      logo: {
        url: string
      }
    }
    site: ('*' | 'dev' | 'vbin' | 'vplay' | 'docs' | 'home' | 'server')[]
  }
}

interface State {
  all: Ref<Banner[]>
  aall: Ref<Banner[]>
  isLoading: ShallowRef<boolean>
  server: ComputedRef<Banner | undefined>
  banner: ComputedRef<Banner | undefined>
  record: Ref<Banner | undefined>

  admin: () => Promise<Banner[]>
  get: () => Promise<Banner[]>
  edit: (slug: string) => Promise<Banner>
  save: (slug: string) => Promise<Banner>
}

export const useBannersStore = defineStore('banners', () => {
  const http = useHttpStore()
  const site = useSiteStore()
  const user = useUserStore()

  const all = ref<Banner[]>([])
  const aall = ref<Banner[]>([])
  const record = ref<Banner | null>()
  const isLoading = shallowRef(false)

  const banner = computed(() => {
    if (record.value) return record.value
    if (server.value) return server.value

    return all.value.find(({
      slug,
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) return false
      if (user.notifications.last.banner.includes(slug)) return false
      if (
        (_site.includes('dev') && import.meta.env.MODE === 'development') ||
        _site.includes('*')
      ) return true

      return _site.some(s => site.id.includes(s))
    })
  })

  const server = computed(() => {
    return all.value.find(({
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) return false

      return _site.includes('server')
    })
  })

  async function get () {
    try {
      isLoading.value = true

      const res = await http.get<{ banners: Banner[] }>('/one/banners')

      all.value = res.banners
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  async function edit (id: string) {
    try {
      isLoading.value = true

      const res = await http.get<{ banner: Banner }>(`/one/admin/banners/${id}/edit`)

      record.value = res.banner

      return res.banner
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function save (id: string, data: FormData) {
    try {
      isLoading.value = true

      const res = await http.put<{ banner: Banner }>(
        `/one/admin/banners/${id}/edit`,
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      record.value = res.banner
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return record.value
  }

  async function admin () {
    try {
      isLoading.value = true

      const res = await http.get<{ banners: Banner[] }>('/one/admin/banners')

      aall.value = res.banners
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    all,
    aall,
    isLoading,
    server,
    banner,
    record,

    admin,
    get,
    edit,
    save,
  } as State
})
