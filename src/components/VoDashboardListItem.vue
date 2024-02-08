<template>
  <v-list-item
    title="Dashboard"
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    to="/user/dashboard"
  />
</template>

<script setup>
  import { mdiViewDashboardOutline } from '@mdi/js'
</script>
