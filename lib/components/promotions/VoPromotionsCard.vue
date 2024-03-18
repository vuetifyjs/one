<template>
  <v-card
    class="d-inline-flex flex-child-1 position-relative"
    color="surface-light"
    rel="noopener"
    target="_blank"
    flat
    rounded
  >
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.image" #image>
      <slot name="image" />
    </template>

    <v-lazy :min-height="minHeight" width="100%">
      <slot />
    </v-lazy>

    <div
      v-if="caption"
      class="text-uppercase position-absolute ms-auto font-weight-medium on-surface-light"
      style="right: 12px; bottom: 8px; font-size: 10px"
    >
      {{ caption }}
    </div>
  </v-card>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    caption?: string
    minHeight?: string | number
  }

  defineProps<Props>()
</script>
