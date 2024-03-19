<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiCreditCardOutline}`"
    title="Subscriptions"
  >
    <VoSubscriptionDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Utilities
  import { shallowRef } from 'vue'

  // Icons
  import { mdiCreditCardOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
