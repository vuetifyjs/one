<template>
  <v-empty-state
    color="primary"
    icon="$vuetify-outline"
    title="404 Not Found"
  >
    <template #media>
      <v-icon color="medium-emphasis" size="256" />
    </template>

    <template #headline>
      <div class="text-h1 mt-n6 mb-6">Oops!</div>
    </template>

    <template #text>
      <p class="text-body-2 text-medium-emphasis py-4">
        The page you are looking for does not exist. If you feel this is in error, please contact
        <a class="text-white" href="mailto:hello@vuetifyjs.com?subject=Missing%20Page" target="_blank">hello@vuetifyjs.com</a>.
      </p>
    </template>

    <template #actions>
      <v-btn text="Go Back" width="150" @click="router.go(-1)" />
    </template>
  </v-empty-state>
</template>

<script lang="ts" setup>
  // Composables
  import { useRouter } from 'vue-router'

  // Utilities
  import { definePage } from 'vue-router/auto'

  definePage({
    meta: {
      guest: true,
    },
  })

  const router = useRouter()
</script>
