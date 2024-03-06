<template>
  <v-timeline-item
    :dot-color="one.github?.isActive ? 'success' : 'transparent'"
    :icon="one.github?.isActive ? `svg:${mdiCheck}` : undefined"
    size="x-small"
    width="100%"
  >
    <v-card
      :prepend-avatar="settings.CDN_URL + '/logos/github.png'"
      rounded="lg"
      subtitle="Support Vuetify through GitHub sponsors."
      title="GitHub Sponsors"
      variant="text"
      border
    >
      <template #append>
        <div class="ps-16">
          <VoBtn
            :color="one.github?.isActive ? 'success' : 'primary'"
            :href="one.github?.isActive ? undefined : 'https://github.com/sponsors/johnleider'"
            :prepend-icon="`svg:${one.github?.isActive ? mdiCheckCircleOutline : mdiInformationOutline}`"
            :readonly="one.github?.isActive"
            :target="one.github?.isActive ? undefined : '_blank'"
            :text="one.github?.isActive ? 'Active' : 'Info'"
            width="88"
          />
        </div>
      </template>

      <template v-if="one.github?.isActive">
        <v-divider />

        <v-card-text class="d-flex justify-space-between align-center flex-wrap">
          <v-chip
            :prepend-icon="`svg:${mdiMedal}`"
            :text="one.github.tierName"
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
  import { useOneStore } from '@/store/one'
  import { useSettingsStore } from '@/store/settings'

  // Icons
  import { mdiCheck, mdiCheckCircleOutline, mdiInformationOutline, mdiMedal } from '@mdi/js'

  const one = useOneStore()
  const settings = useSettingsStore()
</script>
