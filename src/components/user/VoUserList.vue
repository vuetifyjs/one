<template>
  <v-list
    density="compact"
    nav
    slim
  >
    <VoDashboardNavItem v-if="auth.user" />

    <VoNotificationsNavItem />

    <VoStudioNavItem />

    <VoTeamListItem v-if="team.hasTeamAccess" />

    <VoDownloadsNavItem v-if="one.shopify" />

    <VoSponsorshipsListItem />

    <VoSubscriptionListItem v-if="auth.user" />

    <VoSettingsListItem />

    <VoMcpListItem v-if="one.isSubscriber" />

    <VoAuthLogoutNavItem v-if="auth.user" />
  </v-list>
</template>

<script lang="ts" setup>
  const auth = useAuthStore()
  const one = useOneStore()
  const team = useTeamStore()

</script>
