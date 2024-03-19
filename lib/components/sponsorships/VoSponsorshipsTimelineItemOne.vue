<template>
  <VoSponsorshipsTimelineItem
    logo="one"
    :sponsorship="one.one"
    text="Support Vuetify through Vuetify One."
    title="Vuetify One Subscriber"
    to="?one=subscribe"
  />
</template>

<script lang="ts" setup>
  // Stores
  import { useOneStore } from '@/stores/one'

  const one = useOneStore()
</script>
