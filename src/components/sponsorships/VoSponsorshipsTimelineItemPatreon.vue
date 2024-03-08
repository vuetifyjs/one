<template>
  <v-timeline-item
    :dot-color="one.patreon?.isActive ? 'success' : 'transparent'"
    :icon="one.patreon?.isActive ? `svg:${mdiCheck}` : undefined"
    size="x-small"
    width="100%"
  >
    <v-card
      :prepend-avatar="settings.CDN_URL + '/logos/patreon.png'"
      rounded="lg"
      subtitle="Support Vuetify through Patreon."
      title="Patreon Subscriber"
      variant="text"
      border
    >
      <template #append>
        <div class="ps-16">
          <VoBtn
            :text="one.patreon?.isActive ? 'Active' : 'Coming Soon'"
            color="surface-variant"
            readonly
          />

        </div>
      </template>

      <template v-if="one.patreon?.isActive">
        <v-divider />

        <v-card-text class="d-flex justify-space-between align-center flex-wrap">
          <v-chip
            :prepend-icon="`svg:${mdiMedal}`"
            :text="one.patreon.tierName"
            color="success"
            variant="text"
            label
          />
        </v-card-text>
      </template>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts" setup>
  // Stores
  import { useOneStore } from '@/stores/one'
  import { useSettingsStore } from '@/stores/settings'

  // Icons
  import { mdiCheck, mdiMedal } from '@mdi/js'

  const one = useOneStore()
  const settings = useSettingsStore()
</script>
