<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiCreditCardOutline}`"
    rounded="lg"
    title="Subscriptions"
  >
    <VoSubscriptionDialog v-model="dialog" />
  </VoListItem>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiCreditCardOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
