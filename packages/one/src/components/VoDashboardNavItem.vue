<script lang="ts" setup>
  // Icons
  import { mdiViewDashboardOutline } from '@mdi/js'

  const one = useOneStore()
  const site = useSiteStore()

  const isOneSite = toRef(() => site.id.includes('*'))
  const from = toRef(() => site.id.find(id => id !== '*') ?? '')
  const href = toRef(() => {
    if (isOneSite.value) return undefined

    const url = new URL('https://one.vuetifyjs.com/user/dashboard')

    if (from.value) url.searchParams.set('from', from.value)

    return url.toString()
  })
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
