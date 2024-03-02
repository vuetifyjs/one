<template>
  <v-btn
    :style="{
      pointerEvents: props.readonly ? 'none' : undefined,
    }"
    :tabindex="props.readonly ? -1 : undefined"
    class="text-none font-weight-regular"
    color="primary"
    size="small"
    variant="flat"
  >
    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template #loader>
      <v-progress-circular
        indeterminate="disable-shrink"
        size="16"
        width="2"
      />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
  interface Props {
    readonly?: boolean
  }

  const props = defineProps<Props>()
</script>
