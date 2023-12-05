<template>
  <v-list-item
    :prepend-icon="`svg:${mdiGithub}`"
    :title="auth.user ? 'Connect GitHub' : 'Log in with GitHub'"
    base-color="#2a2a2a"
    nav
    slim
    variant="flat"
    @click="auth.login('github')"
  >
    <template #subtitle>
      <span v-if="!auth.user && auth.lastLoginProvider() === 'github'">
        Last Used
      </span>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiGithub } from '@mdi/js'

  const auth = useAuthStore()
</script>
