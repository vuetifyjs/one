<template>
  <v-list
    density="compact"
    nav
    slim
  >
    <VoDashboardListItem />

    <VoNotificationsListItem />

    <VoSponsorshipsListItem />

    <VoSubscriptionListItem v-if="auth.user" />

    <VoSettingsListItem />

    <VoAuthLogoutListItem v-if="auth.user" />
  </v-list>
</template>

<script lang="ts" setup>
  // Stores
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
</script>
