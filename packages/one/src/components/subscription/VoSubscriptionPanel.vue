<script lang="ts" setup>
  // Icons
  import { mdiCheckCircleOutline, mdiPlaylistCheck, mdiReload } from '@mdi/js'

  function wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const one = useOneStore()
  const interval = shallowRef(one.interval)
  const type = shallowRef(one.subscriptionType)
  const window = shallowRef(one.hasBilling ? 'status' : 'subscribe')
  const isUpdatingSubscription = shallowRef<boolean | null>(false)

  watch([interval, type], ([interval, type]) => {
    if (!one.isSubscriber || !one.interval || !one.subscriptionType) return

    isUpdatingSubscription.value = interval !== one.interval || type !== one.subscriptionType
  })

  watchEffect(() => {
    interval.value = one.interval ?? 'year'
    type.value = one.subscriptionType ?? 'solo'
  })

  onMounted(() => {
    if (one.isSubscriber) {
      one.subscriptionInfo()
    }
  })

  async function onClickModify () {
    await one.modify(interval.value!, type.value!)
    await one.subscriptionInfo()

    isUpdatingSubscription.value = null

    await wait(3000)

    window.value = 'status'

    await wait(300)

    isUpdatingSubscription.value = false
  }
</script>

<template>
  <div class="px-3">
    <v-card-text>
      <VoDialogSubheader
        text="The Vuetify One subscription is a great way to support the Vuetify team and get access to exclusive features and content."
        title="Vuetify One"
      />

      <v-window :model-value="window">
        <v-window-item value="subscribe">
          <VoSubscriptionSubscribe v-model:interval="interval" v-model:type="type" />
          <br>
          <VoSubscriptionPerks :type="type" />
        </v-window-item>

        <v-window-item value="status">
          <VoSubscriptionStatus @change:subscription="window = 'subscribe'" />

          <VoSubscriptionInvoices />
        </v-window-item>
      </v-window>
    </v-card-text>

    <div v-if="window === 'subscribe'" class="px-4 pb-3 overflow-hidden">
      <VoBtn
        v-if="isUpdatingSubscription !== false"
        block
        color="success"
        :loading="one.isLoading"
        :prepend-icon="`svg:${isUpdatingSubscription !== null ? mdiReload : mdiCheckCircleOutline}`"
        :readonly="isUpdatingSubscription === null"
        size="default"
        :text="isUpdatingSubscription !== null ? 'Modify Subscription' : 'Success'"
        @click="onClickModify"
      />

      <VoBtn
        v-else-if="!one.one"
        block
        :color="!(interval && type) ? 'disabled' : 'success'"
        :disabled="!(interval && type)"
        :loading="one.isLoading"
        prepend-icon="$vuetify"
        size="default"
        text="Activate Subscription"
        @click="one.subscribe(interval!, type!)"
      />

      <VoBtn
        v-else
        block
        :prepend-icon="`svg:${mdiPlaylistCheck}`"
        size="default"
        text="Manage Subscription"
        @click="window = 'status'"
      />
    </div>
  </div>
</template>
