<template>
  <v-list-item
    :prepend-icon="`svg:${mdiLogoutVariant}`"
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
