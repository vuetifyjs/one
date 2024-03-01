<template>
  <v-list
    density="compact"
    nav
    slim
  >
    <VoDashboardListItem />

    <VoNotificationsListItem />

    <VoSettingsListItem />

    <v-expand-transition appear>
      <div v-if="auth.user">
        <VoSubscriptionListItem />

        <VoLogoutListItem />
      </div>
    </v-expand-transition>
  </v-list>
</template>

<script lang="ts" setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()
</script>
