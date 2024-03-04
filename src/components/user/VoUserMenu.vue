<template>
  <v-card
    rounded="lg"
    width="280"
    border
  >
    <VoUserColors />

    <div class="text-center mt-n9 mb-4">
      <VoUserAvatar />

      <VoUserQuickActions />
    </div>

    <v-divider />

    <VoUserList />

    <v-divider />

    <VoAuthListItem />
  </v-card>
</template>

<script setup lang="ts">
  //
</script>
