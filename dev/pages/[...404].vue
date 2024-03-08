<template>
  <v-empty-state
    action-text="Go back"
    icon="$vuetify-outline"
    title="Page not found"
  >
    <template #media>
      <v-icon size="256" />
    </template>

    <template #headline>
      <div class="text-h1 mb-1">Oops!</div>
    </template>

    <template #text>
      <div class="text-medium-emphasis mt-3">
        The page you are looking for does not exist. Please check the URL or go back to the homepage.
      </div>
    </template>

    <template #actions>
      <!-- Bug where to / href isn't being passed down -->
      <v-btn
        color="primary"
        width="150"
        @click="router.go(-1)"
      />
    </template>
  </v-empty-state>
</template>

<script lang="ts" setup>
  // Composables
  import { useRouter } from 'vue-router'

  const router = useRouter()
</script>
