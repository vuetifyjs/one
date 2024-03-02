<template>
  <v-dialog
    v-if="!auth.user && !auth.isLoading"
    max-width="480"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="{
          ...activatorProps,
          [`${lgAndUp ? 'append-' : ''}icon`]: `svg:${mdiLogin}`,
          text: lgAndUp ? 'Login' : undefined,
        }"
        :rounded="mdAndDown"
        class="text-none"
        color="primary"
        variant="outlined"
      />
    </template>

    <v-card class="pt-6 pb-1 pb-sm-4 px-4 px-sm-8">
      <v-img
        :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-${theme.name.value}.svg`"
        class="mb-4"
        height="30"
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

  <VoUserBtn v-else />
</template>

<script setup lang="ts">
  // Composables
  import { useDisplay, useTheme } from 'vuetify'

  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiLogin } from '@mdi/js'

  const auth = useAuthStore()

  const { mdAndDown, lgAndUp } = useDisplay()
  const theme = useTheme()
</script>
