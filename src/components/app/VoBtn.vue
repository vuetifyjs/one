<template>
  <v-btn
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
  //
</script>
