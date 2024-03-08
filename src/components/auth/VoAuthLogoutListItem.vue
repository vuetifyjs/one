<template>
  <VoListItem
    :disabled="isLoggingout"
    :loading="isLoggingout"
    :prepend-icon="`svg:${mdiLogoutVariant}`"
    class="mb-0"
    title="Logout"
    link
    @click="onClick"
  />
</template>

<script lang="ts" setup>
  // Icons
  import { mdiLogoutVariant } from '@mdi/js'

  const auth = useAuthStore()

  const isLoggingout = shallowRef(false)

  async function onClick () {
    isLoggingout.value = true

    await auth.logout()

    isLoggingout.value = false
  }
</script>
