<template>
  <VoListItem
    :active="dialog"
    :prepend-icon="`svg:${mdiHandHeartOutline}`"
    title="Sponsorships"
    link
  >
    <VoSponsorshipsDialog v-model="dialog" />
  </VoListItem>
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef } from 'vue'

  // Icons
  import { mdiHandHeartOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
