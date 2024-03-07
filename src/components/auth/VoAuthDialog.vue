<template>
  <v-dialog
    v-model="auth.dialog"
    max-width="480"
  >
    <v-card class="pt-6 pb-2 pb-sm-6 px-4 px-sm-8">
      <v-avatar
        :image="'https://vuetifyjs.b-cdn.net/docs/images/avatars/one.png'"
        class="mx-auto"
        size="64"
      />

      <div class="text-center mb-6">
        <v-card-title class="text-h5 mb-1 text-md-h4 font-weight-bold">
          {{ auth.lastLoginProvider() ? 'Welcome Back' : 'Log in to Vuetify' }}
        </v-card-title>

        <v-card-subtitle class="text-wrap">
          Sign in with GitHub or Discord to save your settings and unlock exclusive subscriber perks.
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
  </v-dialog>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
