<template>
  <v-dialog
    v-model="model"
    activator="parent"
    :fullscreen="isFullscreen || display.xs.value"
    height="100%"
    :max-height="isFullscreen || display.xs.value ? '100%' : 800"
    :max-width="isFullscreen || display.xs.value ? '100%' : 800"
  >
    <template #default="{ isActive }">
      <v-card
        class="overflow-hidden"
        height="inherit"
        :prepend-icon="prependIcon"
        :title="title"
      >
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend" />
        </template>

        <v-divider />

        <slot />

        <template #append>
          <slot name="append" />

          <v-btn
            v-if="!display.xs.value"
            class="me-2"
            density="comfortable"
            :icon="`svg:${isFullscreen ? mdiFullscreenExit : mdiFullscreen}`"
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

  interface Props {
    prependIcon?: any
    title: string
  }

  defineProps<Props>()

  const model = defineModel('modelValue', { type: Boolean })
  const display = useDisplay()

  const isFullscreen = shallowRef(false)
</script>
