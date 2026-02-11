<template>
  <VoSponsorshipsTimelineItem
    href="https://discord.com/servers/vuetify-340160225338195969"
    logo="discord"
    :sponsorship="one.discord"
    text="Support Vuetify through Discord."
    title="Discord Subscriber"
  />
</template>

<script lang="ts" setup>
  const one = useOneStore()
</script>
