<template>
  <v-timeline-item
    :dot-color="one.discord?.isActive ? 'success' : 'transparent'"
    :icon="one.discord?.isActive ? `svg:${mdiCheck}` : undefined"
    size="x-small"
    width="100%"
  >
    <v-card
      :prepend-avatar="settings.CDN_URL + '/logos/discord.png'"
      rounded="lg"
      subtitle="Support Vuetify through Discord."
      title="Discord Subscriber"
      variant="text"
      border
    >
      <template #append>
        <div class="ps-16">
          <VoBtn
            :color="one.discord?.isActive ? 'success' : 'primary'"
            :href="one.discord?.isActive ? undefined : 'https://discord.com/servers/vuetify-340160225338195969'"
            :prepend-icon="`svg:${one.discord?.isActive ? mdiCheckCircleOutline : mdiOpenInNew}`"
            :readonly="one.discord?.isActive"
            :target="one.discord?.isActive ? undefined : '_blank'"
            :text="one.discord?.isActive ? 'Active' : 'Info'"
            width="88"
          />

        </div>
      </template>

      <template v-if="one.discord?.isActive">
        <v-divider />

        <v-card-text class="d-flex justify-space-between align-center flex-wrap">
          <v-chip
            :prepend-icon="`svg:${mdiMedal}`"
            :text="one.discord.tierName"
            color="surface-variant"
            size="small"
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
  import { mdiCheck, mdiCheckCircleOutline, mdiMedal, mdiOpenInNew } from '@mdi/js'

  const one = useOneStore()
  const settings = useSettingsStore()
</script>
