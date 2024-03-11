<template>
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
</template>

<script lang="ts" setup>
// Components
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useSettingsStore } from '@/stores/settings'

  const theme = useTheme()

  const settings = useSettingsStore()

  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
