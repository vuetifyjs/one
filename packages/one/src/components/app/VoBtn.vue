<template>
  <v-btn
    class="text-none font-weight-regular"
    color="primary"
    size="small"
    :style="{
      pointerEvents: props.readonly ? 'none' : undefined,
    }"
    :tabindex="props.readonly ? -1 : undefined"
    variant="flat"
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.default" #default>
      <slot />
    </template>

    <template #loader>
      <v-progress-circular
        v-if="!$slots.loader"
        indeterminate="disable-shrink"
        size="16"
        width="2"
      />

      <slot name="loader" />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
  interface Props {
    readonly?: boolean
  }

  const props = defineProps<Props>()
</script>
