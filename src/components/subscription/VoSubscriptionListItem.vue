<template>
  <VoListItem
    :active="dialog"
    :prepend-icon="`svg:${mdiCreditCardOutline}`"
    title="Your Subscriptions"
    link
  >
    <VoSubscriptionDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Utilities
  import { onMounted, shallowRef, watch } from 'vue'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiCreditCardOutline } from '@mdi/js'

  const dialog = shallowRef(false)

  const one = useOneStore()

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })

  onMounted(() => {
    if (!one.sessionId) return

    dialog.value = true
  })
</script>
