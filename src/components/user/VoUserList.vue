<template>
  <v-list
    density="compact"
    nav
    slim
  >
    <VoDashboardNavItem v-if="auth.user" />

    <VoNotificationsNavItem />

    <VoTeamListItem v-if="team.hasTeamAccess" />

    <VoDownloadsNavItem v-if="one.shopify" />

    <VoSponsorshipsListItem />

    <VoSubscriptionListItem v-if="auth.user" />

    <VoMcpListItem v-if="auth.user?.isAdmin" />

    <VoSettingsListItem />

    <VoAuthLogoutNavItem v-if="auth.user" />
  </v-list>
</template>

<script lang="ts" setup>
  const auth = useAuthStore()
  const one = useOneStore()
  const team = useTeamStore()

</script>
