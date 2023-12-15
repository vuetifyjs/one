// Stores
import { useAuthStore } from '@/store/auth'

// Utilities
import { defineStore } from 'pinia'
import { computed, onBeforeMount, shallowRef, watch } from 'vue'

const url = import.meta.env.VITE_API_SERVER_URL

export const useOneStore = defineStore('one', () => {
  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get('session_id')

  const auth = useAuthStore()

  const isLoading = shallowRef(false)

  const subscription = computed(() => {
    return auth.user?.sponsorships.find((s: any) => s.platform === 'stripe' && s.tierName.startsWith('sub_'))
  })
  const isSubscriber = computed(() => subscription.value?.isActive)

  onBeforeMount(async () => {
    if (sessionId) await activate()
  })

  watch(isSubscriber, val => {
    if (!val) return

    verify()
  })

  async function activate () {
    try {
      isLoading.value = true

      const res = await fetch(`${url}/one/activate`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      }).then(res => res.json())

      auth.user = res.user
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function subscribe () {
    isLoading.value = true

    window.location.href = `${url}/one/subscribe`
  }

  async function cancel () {
    if (!subscription.value) return

    try {
      isLoading.value = true

      const res = await fetch(`${url}/one/cancel?subscriptionId=${subscription.value?.tierName}`, {
        method: 'POST',
        credentials: 'include',
      }).then(res => res.json())

      auth.user = res.user
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function verify () {
    if (!subscription.value) return

    try {
      isLoading.value = true

      const res = await fetch(`${url}/one/verify?subscriptionId=${subscription.value?.tierName}`, {
        method: 'POST',
        credentials: 'include',
      }).then(res => res.json())

      auth.user = res.user
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  return {
    activate,
    cancel,
    subscribe,
    verify,
    subscription,
    isLoading,
    isSubscriber,
  }
})
