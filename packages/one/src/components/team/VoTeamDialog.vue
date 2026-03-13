<script lang="ts" setup>
  // Icons
  import { mdiAccountGroup } from '@mdi/js'

  const one = useOneStore()
  const query = useQuery<{ one: string, team: string }>()

  const dialog = defineModel('modelValue', { type: Boolean })

  watch(query, async () => {
    if (!one.sessionId || query.value.one === 'subscribe') return
    if (!query.value.team) return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>

<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiAccountGroup}`"
    title="Team"
  >
    <v-layout>
      <v-main scrollable>
        <VoTeamPanel />
      </v-main>
    </v-layout>
  </VoDialog>
</template>
