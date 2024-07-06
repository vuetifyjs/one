<template>
  <VoAppBar logo="vone">
    <template #prepend>
      <v-app-bar-nav-icon v-if="$vuetify.display.xs" @click="drawer = !drawer" />
    </template>
  </VoAppBar>

  <AppDrawer v-model="drawer" />

  <v-main>
    <router-view />

    <AppFooter />
  </v-main>
</template>

<script lang="ts" setup>
  const drawer = shallowRef<boolean | null>(null)
</script>
