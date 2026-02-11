<template>
  <v-timeline
    class="justify-start ms-n7"
    line-inset="12"
    side="end"
    style="grid-template-columns: auto auto 1fr;"
    truncate-line="both"
  >
    <VoSponsorshipsTimelineItemOne />

    <VoSponsorshipsTimelineItemGithub />

    <VoSponsorshipsTimelineItemDiscord />

    <VoSponsorshipsTimelineItemOpencollective />
  </v-timeline>
</template>

<script lang="ts" setup>
//
</script>
