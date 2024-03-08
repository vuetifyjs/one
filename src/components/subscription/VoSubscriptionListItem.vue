<template>
  <VoListItem
    :active="dialog"
    :prepend-icon="`svg:${mdiCreditCardOutline}`"
    title="Subscriptions"
    link
  >
    <VoSubscriptionDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Icons
  import { mdiCreditCardOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
