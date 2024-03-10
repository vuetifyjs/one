<template>
  <v-app>
    <VoNotificationsBanner />

    <AppBar />

    <v-main>
      <router-view />

      <VoFooter app />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  //
</script>
