// Stores
import { useAuthStore } from '@/store/auth'
import { useHttpStore } from '@/store/http'

// Utilities
import { defineStore } from 'pinia'
import { computed, onBeforeMount, shallowRef, watch } from 'vue'

export const useOneStore = defineStore('one', () => {
  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get('session_id')

  const auth = useAuthStore()
  const http = useHttpStore()

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

      const res = await http.post('/one/activate', { sessionId })

      auth.user = res.user
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function manage () {
    isLoading.value = true

    window.location.href = `${http.url}/one/manage`
  }

  async function subscribe () {
    isLoading.value = true

    window.location.href = `${http.url}/one/subscribe`
  }

  async function cancel () {
    if (!subscription.value) return

    try {
      isLoading.value = true

      const res = await http.post(
        `/one/cancel?subscriptionId=${subscription.value?.tierName}`
      )

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

      const res = await http.post(
        `/one/verify?subscriptionId=${subscription.value?.tierName}`
      )

      auth.user = res.user
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  return {
    activate,
    manage,
    cancel,
    subscribe,
    verify,
    subscription,
    isLoading,
    isSubscriber,
  }
})
