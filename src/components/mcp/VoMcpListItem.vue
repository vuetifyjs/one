<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiKeyOutline}`"
    title="API Key"
  >
    <VoMcpDialog v-model="dialog" />
  </VoListItem>
</template>

<script lang="ts" setup>
  import { mdiKeyOutline } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
