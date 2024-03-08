<template>
  <v-navigation-drawer :image="settings.suit['drawer']">
    <v-list
      :items="items"
      density="compact"
      item-props
      nav
      slim
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  // Utilities
  import { useSettingsStore } from '@/stores/settings'

  // Icons
  import { mdiViewDashboardOutline } from '@mdi/js'

  const settings = useSettingsStore()

  const items = [
    { title: 'Dashboard', to: '/user/dashboard/', prependIcon: `svg:${mdiViewDashboardOutline}` },
  ]
</script>
