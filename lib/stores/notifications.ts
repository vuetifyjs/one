// Pinia
import { defineStore } from 'pinia'

// Composables
import { computed, ComputedRef, ref, Ref, ShallowRef, shallowRef } from 'vue'

// Stores
import { useHttpStore } from './http'
import { useUserStore } from './user'

export interface Notification {
  id: string
  slug: string
  title: string
  created_at: string
  metadata: {
    active: boolean
    text: string
    emoji: string
    color: {
      key: string
      value: string
    }
    action: string
    action_text: string
    attributes: Record<string, any>
  }
}

export interface NotificationsState {
  all: Ref<Notification[]>
  aall: Ref<Notification[]>
  record: Ref<Notification | undefined>
  isLoading: ShallowRef<boolean>
  index: () => Promise<Notification[]>
  admin: () => Promise<Notification[]>
  show: (slug: string) => Promise<Notification>
  store: (data: FormData) => Promise<Notification>
  update: (id: string, data: FormData) => Promise<Notification>
  destroy: (id: string) => Promise<void>
  read: ComputedRef<Notification[]>
  unread: ComputedRef<Notification[]>
}

export const DEFAULT_NOTIFICATION: Notification = {
  id: '',
  slug: '',
  title: 'Notification title',
  created_at: '',
  metadata: {
    active: false,
    text: 'Notification text',
    emoji: '⚡',
    color: {
      key: '',
      value: '',
    },
    action: '',
    action_text: 'Call to action',
    attributes: {},
  },
}

export const useNotificationsStore = defineStore('notifications', () => {
  const http = useHttpStore()
  const user = useUserStore()

  const all = ref<Notification[]>([])
  const aall = ref<Notification[]>([])
  const record = ref<Notification>()
  const isLoading = shallowRef(false)

  const unread = computed(() => all.value.filter(n => !user.notifications.read.includes(n.slug)))
  const read = computed(() => all.value.filter(n => user.notifications.read.includes(n.slug)))

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ notifications: Notification[] }>('/one/notifications')

      all.value = res.notifications
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

      const res = await http.get<{ notification: Notification }>(`/one/admin/notifications/${id}`)

      record.value = res.notification

      return res.notification
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function store (data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ notification: Notification }>(
        '/one/admin/notifications',
        data,
      )

      record.value = res.notification

      return res.notification
    } catch {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function update (id: string, data: FormData) {
    try {
      isLoading.value = true

      const res = await http.form<{ notification: Notification }>(
        `/one/admin/notifications/${id}`,
        data,
      )

      record.value = res.notification

      return res.notification
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

      const res = await http.get<{ notifications: Notification[] }>('/one/admin/notifications')

      aall.value = res.notifications
    } catch {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    isLoading,
    all,
    aall,
    admin,
    record,
    index,
    show,
    store,
    update,
    destroy,
    read,
    unread,
  } as NotificationsState
})
