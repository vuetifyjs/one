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
  const theme = useTheme()

  const settings = useSettingsStore()

  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/vone-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
