// Stores
import { useAuthStore } from '@/store/auth'
import { useHttpStore } from '@/store/http'

// Utilities
import { defineStore } from 'pinia'
import { computed, onBeforeMount, ref, shallowRef, watch } from 'vue'

// Types

interface SubscriptionItemPlan {
  id: string
  amount: number
  currency: string
  interval: 'month' | 'year'
}

interface SubscriptionItem {
  id: string
  plan: SubscriptionItemPlan
}

interface Info {
  id: string
  status: string
  startDate: number
  currentPeriodStart: number
  currentPeriodEnd: number
  items: SubscriptionItem[]
}

interface Invoice {
  date: number
  amount: number
  status: string
  pdf: string
}

export const useOneStore = defineStore('one', () => {
  const params = new URLSearchParams(window.location.search)
  const sessionId = params.get('session_id')

  const auth = useAuthStore()
  const http = useHttpStore()

  const isLoading = shallowRef(false)
  const info = ref<Info>()
  const invoices = ref<Invoice[]>([])
  const interval = computed(() => info.value?.items[0].plan.interval)

  const subscription = computed(() => {
    return auth.user?.sponsorships.find((s: any) => s.platform === 'stripe' && s.tierName.startsWith('sub_'))
  })
  const hasBilling = computed(() => !!subscription.value?.tierName)
  const isSubscriber = computed(() => subscription.value?.isActive)

  onBeforeMount(async () => {
    if (sessionId) await activate()
  })

  watch(isSubscriber, (val, oldVal) => {
    if (val === false && oldVal !== true) return

    verify()
  })

  async function activate () {
    try {
      isLoading.value = true

      const res = await http.post('/one/activate', { sessionId })

      auth.user = res.user

      const url = new URL(window.location.href)
      const params = url.searchParams
      params.delete('session_id')
      history.pushState(null, '', url.toString())
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function manage () {
    window.open(`${http.url}/one/manage`, '_blank')
  }

  async function subscribe (price: string) {
    isLoading.value = true

    window.location.href = `${http.url}/one/subscribe?price=${price}`
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

  async function subscriptionInfo () {
    if (info.value) return

    try {
      isLoading.value = true

      const res = await http.get('/one/subscription-info')

      info.value = res.subscription
      invoices.value = res.invoices

      return res
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
    info,
    interval,
    invoices,
    verify,
    subscription,
    subscriptionInfo,
    sessionId,
    hasBilling,
    isLoading,
    isSubscriber,
  }
})
