<template>
  <v-list-item
    base-color="#2a2a2a"
    :prepend-icon="`svg:${mdiGithub}`"
    rounded="pill"
    slim
    variant="flat"
    @click="auth.login('github')"
  >
    <template #title>
      <span class="text-body-2">{{ text }}</span>
    </template>

    <template
      v-if="(!auth.user && auth.lastLoginProvider() === 'github')"
      #subtitle
    >
      <div class="text-caption mt-n1">Last Used</div>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'

  // Icons
  import { mdiGithub } from '@mdi/js'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('github')
  })

  const text = computed(() => {
    if (!auth.user) return 'Login with GitHub'
    if (hasIdentity.value) return 'Connected to GitHub'

    return 'Connect GitHub'
  })
</script>
