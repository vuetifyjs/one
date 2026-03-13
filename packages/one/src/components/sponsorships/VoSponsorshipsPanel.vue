<script lang="ts" setup>
  const one = useOneStore()
</script>

<template>
  <div class="px-3 pb-5 d-flex flex-column h-100">
    <v-card-text class="flex-0-0 mb-16 mb-sm-4">
      <VoDialogSubheader
        text="Support Vuetify through GitHub Sponsors or Discord to unlock exclusive benefits and content."
        title="Support Vuetify"
      />

      <VoSponsorshipsTimeline />
    </v-card-text>

    <v-empty-state
      class="flex-1-0"
      icon="$vuetify"
      min-height="auto"
      size="128"
    >
      <template #media>
        <v-icon :color="one.isSubscriber ? 'success' : 'error'" />
      </template>

      <template #title>
        One Status:

        <span class="font-weight-black">{{ one.isSubscriber ? 'Active' : 'Inactive' }}</span>
      </template>

      <template #text>
        <div class="text-caption text-medium-emphasis">
          {{ one.isSubscriber ? 'You are currently receiving benefits of Vuetify One.' : 'Login to activate Vuetify One benefits' }}
        </div>
      </template>
    </v-empty-state>
  </div>
</template>
