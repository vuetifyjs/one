<script lang="ts" setup>
  // Icons
  import { mdiHandHeart } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })

  const query = useQuery<{ one: string }>()
  const one = useOneStore()

  watch(query, async () => {
    if (query.value.one !== 'sponsorships') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>

<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiHandHeart}`"
    title="Sponsorships"
  >
    <v-layout>
      <v-main scrollable>
        <VoSponsorshipsPanel />
      </v-main>
    </v-layout>
  </VoDialog>
</template>
