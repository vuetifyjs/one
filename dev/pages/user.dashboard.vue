<template>
  <v-navigation-drawer :image="settings.suit['drawer']">
    <v-list :items="items" item-props />
  </v-navigation-drawer>

  <v-container>
    Dashboard
  </v-container>
</template>

<script lang="ts" setup>
  // Utilities
  import { useSettingsStore } from '@/stores/settings'

  // Icons
  import { mdiHomeOutline, mdiViewDashboardOutline } from '@mdi/js'

  const settings = useSettingsStore()

  const items = [
    { title: 'Home', to: '/', prependIcon: `svg:${mdiHomeOutline}` },
    { title: 'Dashboard', to: '/user/dashboard/', prependIcon: `svg:${mdiViewDashboardOutline}` },
  ]
</script>
