<template>
  <VoListItem
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    title="Dashboard"
    to="/user/dashboard"
  />
</template>

<script setup lang="ts">
  // Icons
  import { mdiViewDashboardOutline } from '@mdi/js'
</script>
