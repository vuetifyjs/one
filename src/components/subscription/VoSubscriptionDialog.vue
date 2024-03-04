<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCreditCard}`"
    title="Subscriptions"
  >
    <div class="px-3 h-screen">
      <v-card-text>
        <VoDialogSubheader
          text="The Vuetify One subscription is a great way to support the Vuetify team and get access to exclusive features and content."
          title="Vuetify One"
        />

        <v-window :model-value="window">
          <v-window-item value="subscribe">
            <VoSubscriptionSubscribe v-model="subscription" />

            <br>

            <VoSubscriptionPerks />
          </v-window-item>

          <v-window-item value="status">
            <VoSubscriptionStatus @change:subscription="window = 'subscribe'" />

            <VoSubscriptionInvoices />
          </v-window-item>
        </v-window>
      </v-card-text>
    </div>

    <template v-if="window === 'subscribe'" #actions>
      <div class="flex-grow-1 px-4 pb-3 overflow-hidden">
        <VoBtn
          v-if="isUpdatingSubscription !== false"
          :loading="one.isLoading"
          :prepend-icon="`svg:${isUpdatingSubscription !== null ? mdiReload : mdiCheckCircleOutline}`"
          :readonly="isUpdatingSubscription === null"
          :text="isUpdatingSubscription !== null ? 'Modify Subscription' : 'Success'"
          color="success"
          size="default"
          block
          @click="onClickModify"
        />

        <VoBtn
          v-else-if="!one.isSubscriber"
          :color="!subscription ? 'disabled' : 'primary'"
          :disabled="!subscription"
          :loading="one.isLoading"
          prepend-icon="$vuetify"
          size="default"
          text="Activate Subscription"
          block
          @click="one.subscribe(subscription!)"
        />

        <VoBtn
          v-else
          :prepend-icon="`svg:${mdiPlaylistCheck}`"
          size="default"
          text="Manage Subscription"
          block
          @click="window = 'status'"
        />
      </div>
    </template>
    <!-- <v-card-actions v-if="window === 'subscribe'" class="overflow-hidden">

    </v-card-actions> -->
  </VoDialog>
</template>

<script lang="ts" setup>
  // Utilities
  import { onMounted, shallowRef, watch } from 'vue'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiCheckCircleOutline, mdiCreditCard, mdiPlaylistCheck, mdiReload } from '@mdi/js'

  function wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const dialog = defineModel('modelValue', { type: Boolean })

  const one = useOneStore()
  const subscription = shallowRef(one.interval)
  const window = shallowRef(one.hasBilling ? 'status' : 'subscribe')
  const isUpdatingSubscription = shallowRef<boolean | null>(false)

  watch(subscription, val => {
    if (!one.isSubscriber || !one.interval) return

    isUpdatingSubscription.value = val !== one.interval
  })

  watch(dialog, async val => {
    if (!val || !one.isSubscriber) return

    one.subscriptionInfo()
  })

  onMounted(() => {
    if (!one.sessionId) return

    window.value = 'status'
    dialog.value = true
  })

  async function onClickModify () {
    await one.modify(subscription.value!)
    await one.subscriptionInfo()

    isUpdatingSubscription.value = null

    await wait(3000)

    window.value = 'status'

    await wait(300)

    isUpdatingSubscription.value = false
  }
</script>
