<template>
  <VoListItem
    :active="dialog"
    :prepend-icon="`svg:${mdiCogOutline}`"
    title="Settings"
    link
  >
    <VoSettingsDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Icons
  import { mdiCogOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
