<template>
  <VoListItem
    :prepend-icon="`svg:${mdiCogOutline}`"
    title="Settings"
    link
  >
    <VoSettingsDialog />
  </VoListItem>
</template>

<script setup lang="ts">
  // Icons
  import { mdiCogOutline } from '@mdi/js'
</script>
