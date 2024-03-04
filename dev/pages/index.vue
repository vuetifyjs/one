<template>
  <v-app-bar :image="settings.suit['app-bar']">
    <template #append>
      <VoAuthBtn />
    </template>
  </v-app-bar>
  <v-navigation-drawer :image="settings.suit['drawer']" />

  <v-container class="d-flex" />
</template>

<script lang="ts" setup>
  import { useSettingsStore } from '../../src/store/settings'
  const settings = useSettingsStore()
</script>
