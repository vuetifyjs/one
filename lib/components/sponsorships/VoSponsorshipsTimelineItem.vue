<template>
  <v-timeline-item
    :dot-color="sponsorship?.isActive ? 'success' : 'transparent'"
    :icon="sponsorship?.isActive ? `svg:${mdiCheck}` : undefined"
    size="x-small"
    width="100%"
  >
    <v-card
      border
      :prepend-avatar="`${settings.CDN_URL}logos/${logo}.png`"
      rounded="lg"
      :title="title"
      variant="text"
    >
      <template #subtitle>
        <template v-if="sponsorship?.isActive">
          <div class="text-success">
            <v-icon :icon="`svg:${mdiMedal}`" size="x-small" />

            {{ tier }}
          </div>
        </template>

        <template v-else>
          {{ text }}
        </template>
      </template>

      <template #append>
        <VoBtn
          v-if="!disabled"
          :active="false"
          :color="sponsorship?.isActive ? 'success' : 'primary'"
          :href="sponsorship?.isActive || to ? undefined : href"
          :prepend-icon="`svg:${sponsorship?.isActive ? mdiCheckCircleOutline : mdiOpenInNew}`"
          :readonly="sponsorship?.isActive"
          :target="sponsorship?.isActive || to ? undefined : '_blank'"
          :text="sponsorship?.isActive ? 'Active' : 'Info'"
          :to="to"
          width="88"
        />

        <VoBtn
          v-else
          color="surface-variant"
          readonly
          text="Coming Soon"
        />
      </template>
    </v-card>
  </v-timeline-item>
</template>

<script lang="ts" setup>
  // Types
  import type { Sponsorship } from '@/stores/auth'

  // Icons
  import { mdiCheck, mdiCheckCircleOutline, mdiMedal, mdiOpenInNew } from '@mdi/js'

  // Types
  interface Props {
    title?: string
    text?: string
    href?: string
    to?: string
    logo?: string
    disabled?: boolean
    sponsorship?: Sponsorship
  }

  const props = defineProps<Props>()

  const settings = useSettingsStore()

  const tier = computed(() => {
    const amount = Number.parseFloat(String((props.sponsorship?.amount ?? 0) / 100)).toFixed(2)

    return `$${amount} /${props.sponsorship?.interval}`
  })
</script>
