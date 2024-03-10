<template>
  <v-app>
    <VoNotificationsBanner v-if="!banners.record" />

    <VoAuthDialog />

    <AppBar />

    <AppDrawer />

    <v-main>
      <router-view />

      <VoFooter app />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  // Stores
  import { useBannersStore } from '@/stores/banners'

  const banners = useBannersStore()
</script>
