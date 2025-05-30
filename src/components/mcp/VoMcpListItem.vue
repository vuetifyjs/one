<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiKeyVariant}`"
    title="MCP Access"
  >
    <VoMcpDialog v-model="dialog" />
  </VoListItem>
</template>

<script lang="ts" setup>
  import { mdiKeyVariant } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
