import { defineStore } from 'pinia'

// Composables
import { useSiteStore } from './site'
import { useUserStore } from './user'

// Utilities
import type { ComputedRef, Ref, ShallowRef } from 'vue'
import { computed, ref, shallowRef } from 'vue'
import { useHttpStore } from './http'

// Types
export interface Banner {
  id: string
  status: 'published' | 'draft'
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
    bg_blur: number | null
    images: {
      bg: {
        url: string
      } | null
      logo: {
        url: string
      } | null
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
  destroy: (slug: string) => Promise<void>
  index: () => Promise<Banner[]>
  show: (slug: string) => Promise<Banner>
  store: (data: FormData) => Promise<Banner>
  update: (slug: string, data: FormData) => Promise<Banner>
}

export const DEFAULT_BANNER: Banner = {
  id: '',
  status: 'draft',
  created_at: '',
  modified_at: '',
  slug: '',
  title: '',
  metadata: {
    active: false,
    closable: false,
    color: '',
    label: '',
    height: 88,
    text: 'Enter text',
    subtext: 'Detailed information about the banner.',
    link: 'https://vuetifyjs.com',
    link_text: 'Click me',
    link_color: '',
    attributes: {},
    start_date: '',
    end_date: '',
    bg_blur: null,
    images: {
      bg: {
        url: '',
      },
      logo: {
        url: '',
      },
    },
    site: [],
  },
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
    if (record.value) {
      return record.value
    }
    if (server.value) {
      return server.value
    }
    if (!user.notifications.banners) {
      return undefined
    }

    return all.value.find(({
      slug,
      metadata: {
        site: _site,
        active,
      },
    }) => {
      if (!active) {
        return false
      }
      if (user.notifications.last.banner.includes(slug)) {
        return false
      }
      if (
        (_site.includes('dev') && import.meta.env.MODE === 'development')
        || _site.includes('*')
      ) {
        return true
      }

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
      if (!active) {
        return false
      }

      return _site.includes('server')
    })
  })

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ banners: Banner[] }>('/one/banners')

      all.value = res.banners
    } catch {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  async function show (id: string) {
    try {
      isLoading.value = true

      const res = await http.get<{ banner: Banner }>(`/one/admin/banners/${id}`)

      record.value = res.banner

      return res.banner
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function store (data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ banner: Banner }>(
        '/one/admin/banners',
        data,
      )

      record.value = res.banner

      return res.banner
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function update (id: string, data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ banner: Banner }>(
        `/one/admin/banners/${id}`,
        data,
      )

      record.value = res.banner

      return res.banner
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function destroy () {}

  async function admin () {
    try {
      isLoading.value = true

      const res = await http.get<{ banners: Banner[] }>('/one/admin/banners')

      aall.value = res.banners
    } catch {
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
    destroy,
    index,
    show,
    store,
    update,
  } as State
})
