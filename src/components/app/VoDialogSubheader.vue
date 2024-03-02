<template>
  <v-label class="font-weight-black">
    {{ title }}
  </v-label>

  <div class="mb-3 text-caption text-medium-emphasis">
    {{ text }}
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    title?: string
    text?: string
  }

  defineProps<Props>()
</script>
