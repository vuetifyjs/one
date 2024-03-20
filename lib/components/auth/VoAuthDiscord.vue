<template>
  <v-list-item
    base-color="#5865F2"
    :prepend-icon="`svg:${mdiDiscord}`"
    rounded="pill"
    slim
    variant="flat"
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
  // Icons
  import { mdiDiscord } from '@mdi/js'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('discord')
  })

  const text = computed(() => {
    if (!auth.user) return 'Login with Discord'

    if (hasIdentity.value) return 'Connected to Discord'

    return 'Connect Discord'
  })
</script>
