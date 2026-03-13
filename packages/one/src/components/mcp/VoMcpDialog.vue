<script lang="ts" setup>
  import { mdiKey } from '@mdi/js'

  const dialog = defineModel<boolean>('modelValue')

  const api = useApiKeyStore()
  const user = useUserStore()

  watch(dialog, async val => {
    if (val) {
      user.ecosystem.mcp.seen = true
      await api.fetch()
    }
  })
</script>

<template>
  <VoDialog
    v-model="dialog"
    height="auto"
    :prepend-icon="`svg:${mdiKey}`"
    title="API Key"
  >
    <v-layout>
      <v-main>
        <VoMcpPanel />
      </v-main>
    </v-layout>
  </VoDialog>
</template>
