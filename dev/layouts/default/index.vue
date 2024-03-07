<template>
  <v-app>
    <VoNotificationsBanner />

    <VoAuthDialog />

    <v-app-bar :image="settings.suit['app-bar']">
      <template #prepend>
        <router-link class="ps-2" to="/">
          <v-img :src="image" width="128" />
        </router-link>
      </template>

      <template #append>
        <VoAuthBtn />
      </template>
    </v-app-bar>

    <v-navigation-drawer :image="settings.suit['drawer']">
      <v-list :items="items" item-props />
    </v-navigation-drawer>

    <v-main>
      <router-view />
      <VoFooter app />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
  // Components
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useSettingsStore } from '../../../src/store/settings'
  import { mdiHomeOutline, mdiViewDashboardOutline } from '@mdi/js'

  const theme = useTheme()

  const settings = useSettingsStore()

  const items = [
    { title: 'Home', to: '/', prependIcon: `svg:${mdiHomeOutline}` },
    { title: 'Dashboard', to: '/user/dashboard/', prependIcon: `svg:${mdiViewDashboardOutline}` },
  ]
  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
