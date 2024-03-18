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
  // Stores
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
</script>
