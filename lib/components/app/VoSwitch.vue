<template>
  <v-switch
    color="primary"
    density="compact"
    :disabled="disabled"
    inset
    :true-icon="`svg:${mdiCheck}`"
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
