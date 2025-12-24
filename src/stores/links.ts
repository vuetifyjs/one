// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

export interface VOneLink {
  id: string
  slug: string
  title: string
  url: string
  favorite: boolean
  pinned: boolean
  owner: Record<string, unknown>
  expiresAt: string | null
  expired: boolean
  timer: number | null
  passwordProtection: boolean
  createdAt: string
  updatedAt: string
  visits?: number
  totalVisits?: number
  scoped: boolean
}

export interface CreateLinkOptions {
  title: string
  url: string
  slug?: string
  favorite?: boolean
  pinned?: boolean
  scoped?: boolean
  passwordProtection?: boolean
  password?: string | null
  timer?: number | null
  expiresAt?: Date | null
}

export interface LinksState {
  isLoading: ShallowRef<boolean>
  isSaving: ShallowRef<boolean>
  canCreate: ComputedRef<boolean>
  pinned: ComputedRef<VOneLink[]>
  favorites: ComputedRef<VOneLink[]>
  all: Ref<VOneLink[]>
  index: () => Promise<VOneLink[]>
  create: (options: CreateLinkOptions) => Promise<VOneLink | undefined>
}

export const useLinksStore = defineStore('links', (): LinksState => {
  const http = useHttpStore()
  const queue = useQueueStore()

  const all = ref<VOneLink[]>([])
  const isLoading = shallowRef(false)
  const isSaving = shallowRef(false)

  const favorites = computed(() => all.value.filter(l => l.favorite))
  const pinned = computed(() => all.value.filter(l => l.pinned))

  // Lazily access auth/one stores to avoid lifecycle hook issues
  const canCreate = computed(() => {
    const auth = useAuthStore()
    const one = useOneStore()
    return auth.user?.isAdmin || one.isSubscriber
  })

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ links: VOneLink[] }>('/one/links')

      all.value = res.links
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error fetching links')
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  async function create (options: CreateLinkOptions): Promise<VOneLink | undefined> {
    if (!canCreate.value) {
      queue.showError('Must be a Vuetify One subscriber to create links')
      return
    }

    try {
      isSaving.value = true

      const res = await http.post<{ link: VOneLink }>('/one/links', {
        link: {
          title: options.title,
          url: options.url,
          slug: options.slug || '',
          favorite: options.favorite ?? false,
          pinned: options.pinned ?? false,
          scoped: options.scoped ?? false,
          passwordProtection: options.passwordProtection ?? false,
          password: options.password ?? null,
          timer: options.timer ?? null,
          expiresAt: options.expiresAt ?? null,
        },
      })

      all.value.unshift(res.link)

      return res.link
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error creating link')
    } finally {
      isSaving.value = false
    }
  }

  return {
    isLoading,
    isSaving,
    canCreate,
    pinned,
    favorites,
    all,
    index,
    create,
  }
})
