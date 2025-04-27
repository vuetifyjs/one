<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiAccountGroupOutline}`"
    title="My Team"
  >
    <VoTeamDialog v-model="dialog" />
  </VoListItem>
</template>

  <script setup lang="ts">
    // Icons
  import { mdiAccountGroupOutline } from '@mdi/js'

  const dialog = shallowRef(false)
  </script>
