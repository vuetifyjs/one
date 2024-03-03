<template>
  <v-label v-if="title" class="font-weight-black">
    {{ title }}
  </v-label>

  <div v-if="text" class="mb-3 text-caption text-medium-emphasis">
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
