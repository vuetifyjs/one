<template>
  <a
    v-if="spots.spot"
    :href="spots.spot.metadata.href"
    rel="noopener noreferrer sponsored"
    target="_blank"
  >
    <v-img
      class="mx-auto"
      :color="spots.spot.metadata.image ? undefined : 'surface'"
      rounded
      :src="spots.spot.metadata.image?.url"
      width="225"
    />
  </a>
</template>

<script lang="ts" setup>
  import { useSpotsStore } from '@/stores/spots'

  const spots = useSpotsStore()
</script>
