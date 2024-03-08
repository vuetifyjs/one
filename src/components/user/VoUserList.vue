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
  const auth = useAuthStore()
</script>
