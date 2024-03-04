<template>
  <v-app-bar :image="settings.suit['app-bar']" />
  <v-container class="d-flex">
    <VoAuthBtn />
    <!-- <VoAuthDialog /> -->
  </v-container>
</template>

<script lang="ts" setup>
  import { useSettingsStore } from '../../src/store/settings'
  const settings = useSettingsStore()
</script>
