<template>
  <VoSponsorshipsTimelineItem
    href="https://github.com/sponsors/johnleider"
    logo="github"
    :sponsorship="one.github"
    text="Support Vuetify through GitHub sponsors."
    title="GitHub Sponsor"
  />
</template>

<script lang="ts" setup>
  // Stores
  import { useOneStore } from '@/stores/one'

  const one = useOneStore()
</script>
