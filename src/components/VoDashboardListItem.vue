<template>
  <VoListItem
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    title="Dashboard"
    to="/user/dashboard"
    @click="one.isOpen = false"
  />
</template>

<script setup lang="ts">
  // Stores
  import { useOneStore } from '@/stores/one'

  // Icons
  import { mdiViewDashboardOutline } from '@mdi/js'

  const one = useOneStore()
</script>
@/stores/one
