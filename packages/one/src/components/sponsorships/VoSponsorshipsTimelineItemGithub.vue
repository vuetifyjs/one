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
  const one = useOneStore()
</script>
