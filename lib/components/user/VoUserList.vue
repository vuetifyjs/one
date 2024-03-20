<template>
  <v-list
    density="compact"
    nav
    slim
  >
    <VoDashboardNavItem />

    <VoNotificationsNavItem />

    <VoStudioNavItem />

    <VoSponsorshipsListItem />

    <VoSubscriptionListItem v-if="auth.user" />

    <VoSettingsListItem />

    <VoAuthLogoutNavItem v-if="auth.user" />
  </v-list>
</template>

<script lang="ts" setup>
  const auth = useAuthStore()
</script>
