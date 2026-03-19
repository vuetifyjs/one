<script lang="ts" setup>
  // Icons
  import { mdiCog } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })
  const one = useOneStore()

  const query = useQuery<{ one: string }>()

  watch(query, async () => {
    if (query.value.one !== 'settings') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>

<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCog}`"
    title="Settings"
  >
    <v-layout>
      <v-main scrollable>
        <VoSettingsPanel />
      </v-main>
    </v-layout>
  </VoDialog>
</template>
