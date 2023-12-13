<template>
  <v-list-item
    :prepend-icon="`svg:${mdiDiscord}`"
    :title="auth.user ? 'Connect Discord' : 'Log in with Discord'"
    :subtitle="(!auth.user && auth.lastLoginProvider() === 'discord') ? 'Last Used' : ''"
    nav
    base-color="#5865F2"
    slim
    variant="flat"
    @click="auth.login('discord')"
  ></v-list-item>
</template>

<script setup lang="ts">
  // Components
  import { VListItem } from 'vuetify/components'

  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiDiscord } from '@mdi/js'

  const auth = useAuthStore()
</script>
