<template>
  <v-dialog
    v-model="model"
    :fullscreen="isFullscreen || display.xs.value"
    :max-height="isFullscreen || display.xs.value ? '100%' : 800"
    :max-width="isFullscreen || display.xs.value ? '100%' : 800"
    activator="parent"
    height="100%"
  >
    <template #default="{ isActive }">
      <v-card
        :prepend-icon="prependIcon"
        :title="title"
        class="overflow-hidden"
        height="inherit"
      >
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend" />
        </template>

        <v-divider class="mt-4" />

        <slot />

        <template #append>
          <slot name="append" />

          <v-btn
            v-if="!display.xs.value"
            :icon="`svg:${isFullscreen ? mdiFullscreenExit : mdiFullscreen}`"
            class="me-2"
            density="comfortable"
            size="small"
            variant="text"
            @click="isFullscreen = !isFullscreen"
          />

          <v-btn
            density="comfortable"
            icon="$close"
            size="small"
            variant="text"
            @click="model = !model"
          />
        </template>

        <template v-if="$slots.actions" #actions>
          <slot :is-active="isActive" name="actions" />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  // Composables
  import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js'
  import { useDisplay } from 'vuetify'

  // Utilities
  import { shallowRef } from 'vue'

  interface Props {
    prependIcon: string
    title: string
  }

  defineProps<Props>()

  const model = defineModel('modelValue', { type: Boolean })
  const display = useDisplay()

  const isFullscreen = shallowRef(false)
</script>
