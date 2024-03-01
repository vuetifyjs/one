<template>
  <VoListItem
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    title="Dashboard"
    to="/user/dashboard"
  />
</template>

<script setup>
  import { mdiViewDashboardOutline } from '@mdi/js'
</script>
