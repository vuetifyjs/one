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
      </v-main>
    </v-layout>

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
  </VoDialog>
</template>

<script lang="ts" setup>
  // Utilities
  import { nextTick, shallowRef, watch } from 'vue'
  import { useQuery } from '@/composables/route'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiCheckCircleOutline, mdiCreditCard, mdiPlaylistCheck, mdiReload } from '@mdi/js'

  function wait (ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const dialog = defineModel('modelValue', { type: Boolean })

  const one = useOneStore()
  const query = useQuery<{ one: string }>()
  const subscription = shallowRef(one.interval)
  const window = shallowRef(one.hasBilling ? 'status' : 'subscribe')
  const isUpdatingSubscription = shallowRef<boolean | null>(false)

  watch(subscription, val => {
    if (!one.isSubscriber || !one.interval) return

    isUpdatingSubscription.value = val !== one.interval
  })

  watch(dialog, async val => {
    one.resetQuery()

    if (!val || !one.isSubscriber) return

    one.subscriptionInfo()
  })

  watch(query, async () => {
    if (!one.sessionId && !['subscribe', 'status'].includes(query.value.one)) return

    window.value = one.sessionId || query.value.one === 'status' ? 'status' : 'subscribe'

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })

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
