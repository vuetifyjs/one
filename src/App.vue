<template>
  <v-app>
    <AppBar />

    <router-view />
  </v-app>

  <SpeedInsights />
</template>

<script lang="ts" setup>
  // Utilities
  import { inject } from '@vercel/analytics'
  import { SpeedInsights } from '@vercel/speed-insights/vue'

  inject()
</script>
