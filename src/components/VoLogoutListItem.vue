<template>
  <VoListItem
    :prepend-icon="`svg:${mdiLogoutVariant}`"
    class="mb-0"
    title="Logout"
    link
    @click="() => auth.logout()"
  />
</template>

<script lang="ts" setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiLogoutVariant } from '@mdi/js'

  const auth = useAuthStore()
</script>
