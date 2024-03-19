<template>
  <VoListItem
    class="mb-0"
    :disabled="isLoggingout"
    link
    :loading="isLoggingout"
    :prepend-icon="`svg:${mdiLogoutVariant}`"
    title="Logout"
    @click="onClick"
  />
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'

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
