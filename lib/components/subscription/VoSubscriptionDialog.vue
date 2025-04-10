<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCreditCard}`"
    title="Subscriptions"
  >
    <v-layout>
      <v-main scrollable>
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
        </div>
      </v-main>
    </v-layout>

    <template v-if="window === 'subscribe'" #actions>
      <div class="flex-grow-1 px-4 pb-3 overflow-hidden">
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
    </template>
  </VoDialog>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiCheckCircleOutline, mdiCreditCard, mdiPlaylistCheck, mdiReload } from '@mdi/js'

  function wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const dialog = defineModel('modelValue', { type: Boolean })

  const one = useOneStore()
  const query = useQuery<{ one: string, team: string}>()
  const interval = shallowRef(one.interval)
  const type = shallowRef(one.subscriptionType)
  const window = shallowRef(one.hasBilling ? 'status' : 'subscribe')
  const isUpdatingSubscription = shallowRef<boolean | null>(false)

  watch([interval, type], ([interval, type]) => {
    if (!one.isSubscriber || !one.interval || !one.subscriptionType) return

    isUpdatingSubscription.value = interval !== one.interval || type !== one.subscriptionType
  })

  watch(dialog, async val => {
    if (!val || !one.isSubscriber) {
      if (!val) one.resetQuery()

      return
    }

    one.subscriptionInfo()
  })

  watch(query, async () => {
    if (!one.sessionId && !['subscribe', 'status'].includes(query.value.one)) return
    if (query.value.team) return
    window.value = one.sessionId || query.value.one === 'status' ? 'status' : 'subscribe'

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })

  watchEffect(() => {
    interval.value = one.interval ?? 'year'
    type.value = one.subscriptionType ?? 'solo'
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
