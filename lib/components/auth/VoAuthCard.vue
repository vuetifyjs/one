<template>
  <v-card
    class="pt-6 pb-8 px-4 px-sm-8 mx-auto"
    max-width="480"
  >
    <div class="text-center">
      <v-avatar
        class="mx-auto"
        :image="'https://vuetifyjs.b-cdn.net/docs/images/avatars/one.png'"
        size="64"
      />
    </div>

    <div class="text-center mb-6">
      <v-card-title class="text-h5 mb-1 text-md-h4">
        <div class="font-weight-light mb-2">
          {{ auth.lastLoginProvider() ? 'Welcome back to' : 'Login to' }}
        </div>
        <span class="font-weight-bold">Vuetify One</span>
      </v-card-title>

      <v-card-subtitle class="text-wrap">
        Login with GitHub or Discord to save your settings and unlock exclusive subscriber perks.
      </v-card-subtitle>
    </div>

    <v-list
      class="mx-auto"
      max-width="300"
      width="100%"
    >
      <VoAuthGithub class="mb-3" />

      <VoAuthDiscord />
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
</script>
