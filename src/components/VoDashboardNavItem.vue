<template>
  <VoListItem
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    rounded="lg"
    title="Dashboard"
    to="/user/dashboard"
    @click="onClick"
  />
</template>

<script setup lang="ts">
  // Icons
  import { mdiViewDashboardOutline } from '@mdi/js'

  const one = useOneStore()

  function onClick () {
    // TODO: Figure out why this is needed for Playground dashboard link to work
    setTimeout(() => {
      one.isOpen = false
    }, 100)
  }
</script>
