<template>
  <v-list-item
    :prepend-icon="`svg:${mdiDiscord}`"
    base-color="#5865F2"
    rounded="pill"
    variant="flat"
    slim
    @click="auth.login('discord')"
  >
    <template #title>
      <span class="text-body-2">{{ text }}</span>
    </template>

    <template
      v-if="(!auth.user && auth.lastLoginProvider() === 'discord')"
      #subtitle
    >
      <div class="text-caption mt-n1">Last Used</div>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
    // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiDiscord } from '@mdi/js'
  import { computed } from 'vue'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('discord')
  })

  const text = computed(() => {
    if (!auth.user) return 'Log in with Discord'

    if (hasIdentity.value) return 'Connected to Discord'

    return 'Connect Discord'
  })
</script>
