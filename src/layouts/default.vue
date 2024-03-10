<template>
  <v-app>
    <VoNotificationsBanner />

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
  //
</script>
