<template>
  <v-card
    class="pt-6 pb-8 px-4 px-sm-8 mx-auto"
    max-width="480"
    rounded="lg"
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
        <div class="text-h6 font-weight-light">
          {{ auth.lastLoginProvider() ? 'Welcome back to' : 'Login to' }}
        </div>
        <span class="text-h3 font-weight-bold">Vuetify One</span>
      </v-card-title>

      <v-card-subtitle class="text-wrap">
        Login to save your settings and gain access to exclusive subscriber perks.
      </v-card-subtitle>
    </div>

    <v-list
      class="mx-auto"
      max-width="300"
      width="100%"
    >
      <VoAuthGithub class="mb-3" />

      <VoAuthGoogle class="mb-3" />

      <VoAuthDiscord class="mb-3" />

      <VoAuthShopify class="mb-3" />

      <VoAuthOpenCollective />
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
  const auth = useAuthStore()
</script>
