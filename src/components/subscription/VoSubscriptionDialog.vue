<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCreditCard}`"
    title="Subscriptions"
    scrollable
  >
    <div class="px-3 h-screen">
      <v-card-text>
        <v-label class="font-weight-black">Vuetify One</v-label>

        <div class="mb-3 text-caption text-medium-emphasis">
          The Vuetify One subsription is a great way to support the Vuetify team and get access to exclusive features and content.
        </div>

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

    <v-card-actions v-if="window === 'subscribe'" class="overflow-hidden">
      <div class="flex-grow-1 px-4 pb-3 overflow-hidden">
        <VoBtn
          v-if="isUpdatingSubscription"
          color="success"
          size="default"
          text="Update Subscription"
          block
        />

        <VoBtn
          v-else-if="!one.isSubscriber"
          :color="!subscription ? 'disabled' : 'primary'"
          :disabled="!subscription"
          :loading="one.isLoading"
          size="default"
          text="Activate Subscription"
          block
          @click="one.subscribe(subscription!)"
        />

        <VoBtn
          v-else
          size="default"
          text="Manage Subscription"
          block
          @click="window = 'status'"
        />
      </div>
    </v-card-actions>
  </VoDialog>
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef, watch } from 'vue'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiCreditCard } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })

  const one = useOneStore()
  const subscription = shallowRef(one.interval)
  const window = shallowRef(one.hasBilling ? 'status' : 'subscribe')
  const isUpdatingSubscription = shallowRef(false)

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })

  watch(subscription, val => {
    isUpdatingSubscription.value = val !== one.interval
  })
</script>
