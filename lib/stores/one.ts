// Composables
import { useRouter } from 'vue-router'
import { useQuery } from '@/composables/route'

// Stores
import { useAuthStore } from '@/stores/auth'
import { useHttpStore } from '@/stores/http'

// Utilities
import { defineStore } from 'pinia'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'

// Types
interface SubscriptionItemPlan {
  id: string
  amount: number
  currency: string
  interval: 'month' | 'year'
  type: 'solo' | 'team'
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
  const query = useQuery<{ one: string, session_id: string }>()
  const router = useRouter()

  const auth = useAuthStore()
  const http = useHttpStore()
  const team = useTeamStore()

  const isLoading = shallowRef(false)
  const isOpen = shallowRef(false)
  const info = ref<Info>()
  const invoices = ref<Invoice[]>([])
  const sessionId = computed(() => query.value.session_id)
  const interval = computed(() => info.value?.items[0].plan.interval)
  const subscriptionType = computed(() => info.value?.items[0].plan.type)

  const access = ref<string[]>([])

  const subscription = computed(() => {
    return auth.user?.sponsorships.find(s => s.platform === 'stripe' && s.tierName.startsWith('sub_'))
  })
  const hasBilling = computed(() => !!subscription.value?.tierName)

  const monthlyTotal = computed(() => {
    return auth.user?.sponsorships.reduce((acc: number, s) => {
      if (!s.isActive || s.interval === 'once' || s.platform === 'stripe') return acc
      const amount = ['teamMonth', 'soloMonth'].includes(s.interval) ? s.amount : s.amount / 12
      return acc + amount / 100
    }, 0) ?? 0
  })

  const one = computed(() => {
    return auth.user?.sponsorships.find(s => s.tierName.startsWith('sub_') && s.isActive)
  })
  const github = computed(() => {
    return auth.user?.sponsorships.find(s => s.platform === 'github' && s.isActive)
  })
  const discord = computed(() => {
    return auth.user?.sponsorships.find(s => s.platform === 'discord' && s.isActive)
  })
  const shopify = computed(() => {
    return auth.user?.identities.find(i => i.provider === 'shopify')
  })
  const patreon = computed(() => {
    return auth.user?.sponsorships.find(s => s.platform === 'patreon' && s.isActive)
  })

  const isSubscriber = computed(() => (
    !http.url ||
    auth.user?.isAdmin ||
    subscription.value?.isActive ||
    github.value?.isActive ||
    discord.value?.isActive ||
    patreon.value?.isActive ||
    monthlyTotal.value >= 2.99
  ))

  onMounted(async () => {
    if (sessionId.value) await activate()
  })

  watch(isOpen, resetQuery)
  watch(sessionId, async val => {
    if (!val) return

    await activate()
  }, { immediate: true })

  watch(query, val => {
    if (val.one !== 'subscribe' || auth.user) return

    auth.dialog = true

    const unwatch = watch(() => auth.user, val => {
      if (!val) return

      auth.dialog = false

      unwatch()
    })
  }, { immediate: true })

  watch(isSubscriber, (val, oldVal) => {
    if (val === false && oldVal !== true) return

    verify()
  })

  async function activate () {
    try {
      isLoading.value = true

      await http.post('/one/activate', { sessionId: sessionId.value })
      await auth.verify(true)
      await subscriptionInfo()

      const url = new URL(window.location.href)
      const params = url.searchParams
      params.delete('session_id')
      params.delete('team')
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

  async function subscribe (interval: SubscriptionItemPlan['interval'], type: SubscriptionItemPlan['type']) {
    isLoading.value = true
    const url = new URL('/one/subscribe', http.url)
    url.searchParams.set('interval', interval)
    url.searchParams.set('type', type)
    window.location.href = url.toString()
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

  async function modify (interval: SubscriptionItemPlan['interval'], type: SubscriptionItemPlan['type']) {
    if (!subscription.value) return

    try {
      isLoading.value = true

      await http.post('/one/modify', {
        subscriptionId: subscription.value.tierName,
        interval,
        type,
      })

      await auth.verify(true)
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

      await http.post(
        `/one/verify?subscriptionId=${subscription.value?.tierName}`)

      await auth.verify(true)
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  async function subscriptionInfo () {
    try {
      isLoading.value = true

      const res = await http.get('/one/info')

      info.value = res.subscription
      invoices.value = res.invoices
      return res
    } catch (e) {
      //
    } finally {
      isLoading.value = false
    }
  }

  function resetQuery () {
    router.push({
      query: {
        ...query.value,
        one: undefined,
      },
    })
  }

  return {
    info,
    interval,
    subscriptionType,
    access,

    invoices,
    sessionId,
    subscription,
    monthlyTotal,

    hasBilling,
    isLoading,
    isOpen,
    isSubscriber,

    github,
    patreon,
    discord,
    shopify,
    one,

    activate,
    cancel,
    manage,
    modify,
    resetQuery,
    subscribe,
    subscriptionInfo,
    verify,
  }
})
