// Pinia
import { defineStore } from 'pinia'

// Composables
import { computed, ref, shallowRef } from 'vue'

// Stores
import { useHttpStore } from './http'
import { useUserStore } from './user'

export interface Notification {
  slug: string
  title: string
  created_at: string
  metadata: {
    text: string
    emoji: string
    color: {
      key: string
      value: string
    }
    action: string
    action_text: string
  }
}

export const useNotificationsStore = defineStore('notifications', () => {
  const http = useHttpStore()
  const user = useUserStore()

  const all = ref<Notification[]>([])
  const isLoading = shallowRef(false)

  const unread = computed(() => all.value.filter(n => !user.notifications.read.includes(n.slug)))
  const read = computed(() => all.value.filter(n => user.notifications.read.includes(n.slug)))

  async function get () {
    try {
      isLoading.value = true

      const res = await http.get<{ notifications: Notification[] }>('/one/notifications')

      all.value = res.notifications
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }

    return all.value
  }

  return {
    isLoading,
    all,
    get,
    read,
    unread,
  }
})
