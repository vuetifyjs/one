<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiCogOutline}`"
    rounded="lg"
    title="Settings"
  >
    <VoSettingsDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Icons
  import { mdiCogOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
