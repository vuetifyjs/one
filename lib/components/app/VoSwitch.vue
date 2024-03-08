<template>
  <v-switch
    :disabled="disabled"
    :true-icon="`svg:${mdiCheck}`"
    color="primary"
    density="compact"
    inset
  >
    <template v-if="$slots.label" #label>
      <slot name="label" />
    </template>

    <template #thumb>
      <v-icon :color="!disabled ? 'primary' : undefined" />
    </template>
  </v-switch>
</template>

<script setup lang="ts">
  import { mdiCheck } from '@mdi/js'

  interface Props {
    disabled?: boolean
  }

  defineProps<Props>()
</script>
