<template>
  <v-list-item
    :prepend-icon="`svg:${mdiGithub}`"
    :title="auth.user ? 'Connect GitHub' : 'Log in with GitHub'"
    :subtitle="(!auth.user && auth.lastLoginProvider() === 'github') ? 'Last Used' : ''"
    base-color="#2a2a2a"
    nav
    slim
    variant="flat"
    @click="auth.login('github')"
  />
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiGithub } from '@mdi/js'

  const auth = useAuthStore()
</script>
