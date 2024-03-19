<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiCogOutline}`"
    title="Settings"
  >
    <VoSettingsDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Icons
  import { mdiCogOutline } from '@mdi/js'

  import { shallowRef } from 'vue'

  const dialog = shallowRef(false)
</script>
