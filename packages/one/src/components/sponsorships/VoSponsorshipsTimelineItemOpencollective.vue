<template>
  <VoSponsorshipsTimelineItem
    href="https://opencollective.com/vuetify"
    logo="opencollective"
    :sponsorship="one.opencollective"
    text="Support Vuetify through Open Collective."
    title="Open Collective Subscriber"
  />
</template>

<script lang="ts" setup>
  const one = useOneStore()
</script>
