<template>
  <v-app>
    <VoNotificationsBanner />

    <AppBar />

    <AppDrawer />

    <v-main>
      <router-view />

      <AppFooter />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
