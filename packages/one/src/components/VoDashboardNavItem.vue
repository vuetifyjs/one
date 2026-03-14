<script lang="ts" setup>
  // Icons
  import { mdiViewDashboardOutline } from '@mdi/js'

  const one = useOneStore()
  const site = useSiteStore()

  const isOneSite = toRef(() => site.id.includes('*'))
  const href = toRef(() => isOneSite.value ? undefined : 'https://one.vuetifyjs.com/user/dashboard')
  const to = toRef(() => isOneSite.value ? '/user/dashboard' : undefined)

  function onClick () {
    one.isOpen = false
  }
</script>

<template>
  <VoListItem
    :href="href"
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    rounded="lg"
    :target="href ? '_blank' : undefined"
    title="Dashboard"
    :to="to"
    @click="onClick"
  />
</template>
