<template>
  <v-list slim nav>
    <VoDashboardListItem />

    <VoNotificationsListItem />

    <VoLogoutListItem />
  </v-list>
</template>

<script lang="ts" setup>
  import { mdiLogoutVariant } from '@mdi/js'
</script>
