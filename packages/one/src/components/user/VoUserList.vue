<template>
  <v-list
    density="compact"
    nav
    slim
  >
    <VoDashboardNavItem v-if="auth.user" />

    <VoAccountNavItem v-if="auth.user" />

    <VoNotificationsNavItem />

    <VoEcosystemListItem />

    <VoDownloadsNavItem v-if="one.shopify" />

    <VoSettingsListItem />

    <VoAuthLogoutNavItem v-if="auth.user" />
  </v-list>
</template>

<script lang="ts" setup>
  const auth = useAuthStore()
  const one = useOneStore()
</script>
