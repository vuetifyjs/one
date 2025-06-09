// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

export interface VOneNotification {
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
  all: Ref<VOneNotification[]>
  isLoading: ShallowRef<boolean>
  read: ComputedRef<VOneNotification[]>
  unread: ComputedRef<VOneNotification[]>
  index: () => Promise<VOneNotification[]>
}

export const useNotificationsStore = defineStore('notifications', (): NotificationsState => {
  const http = useHttpStore()
  const user = useUserStore()
  const queue = useQueueStore()

  const all = ref<VOneNotification[]>([])
  const isLoading = shallowRef(false)

  const unread = computed(() => all.value.filter(n => !user.one.notifications.read.includes(n.slug)))
  const read = computed(() => all.value.filter(n => user.one.notifications.read.includes(n.slug)))

  async function index () {
    try {
      isLoading.value = true

      const res = await http.get<{ notifications: VOneNotification[] }>('/one/notifications')

      all.value = res.notifications
    } catch (error: any) {
      queue.showError(error?.message ?? 'Error fetching notifications')
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    isLoading,
    all,
    read,
    unread,
    index,
  }
})
