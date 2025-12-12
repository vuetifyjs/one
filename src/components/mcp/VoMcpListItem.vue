<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiKeyOutline}`"
    rounded="lg"
    title="API Key"
  >
    <template v-if="!user.ecosystem.mcp.seen" #append>
      <v-chip color="success" size="x-small" variant="flat">NEW</v-chip>
    </template>

    <VoMcpDialog v-model="dialog" />
  </VoListItem>
</template>

<script lang="ts" setup>
  import { mdiKeyOutline } from '@mdi/js'

  const user = useUserStore()
  const dialog = shallowRef(false)
</script>
