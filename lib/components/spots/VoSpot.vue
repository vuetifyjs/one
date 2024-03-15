<template>
  <a
    v-if="spots.spot"
    :href="spots.spot.metadata.href"
    rel="noopener noreferrer sponsored"
    target="_blank"
  >
    <v-img
      :color="spots.spot.metadata.image ? undefined : 'surface'"
      :src="spots.spot.metadata.image?.url"
      class="mx-auto"
      width="225"
      rounded
    />
  </a>
</template>

<script lang="ts" setup>
  import { useSpotsStore } from '@/stores/spots'

  const spots = useSpotsStore()
</script>
