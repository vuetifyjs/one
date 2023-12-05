<template>
  <v-list-item
    :prepend-icon="`svg:${mdiDiscord}`"
    :title="auth.user ? 'Connect Discord' : 'Log in with Discord'"
    nav
    base-color="#5865F2"
    slim
    variant="flat"
    @click="auth.login('discord')"
  >
    <template #subtitle>
      <span v-if="!auth.user && auth.lastLoginProvider() === 'discord'">
        Last Used
      </span>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiDiscord } from '@mdi/js'

  const auth = useAuthStore()
</script>
