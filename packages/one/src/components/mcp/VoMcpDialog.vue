<script lang="ts" setup>
  import { mdiConnection } from '@mdi/js'

  const dialog = defineModel<boolean>('modelValue')

  const user = useUserStore()

  watch(dialog, val => {
    if (val) {
      user.ecosystem.mcp.seen = true
    }
  })
</script>

<template>
  <VoDialog
    v-model="dialog"
    height="auto"
    :prepend-icon="`svg:${mdiConnection}`"
    title="MCP Access"
  >
    <v-layout>
      <v-main>
        <VoMcpPanel />
      </v-main>
    </v-layout>
  </VoDialog>
</template>
