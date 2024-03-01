<template>
  <v-list-item
    :prepend-icon="`svg:${mdiGithub}`"
    base-color="#2a2a2a"
    rounded="pill"
    variant="flat"
    slim
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
  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiCloseCircle, mdiGithub } from '@mdi/js'
  import { computed } from 'vue'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('github')
  })

  const text = computed(() => {
    if (!auth.user) return 'Log in with GitHub'

    if (hasIdentity.value) return 'Connected to GitHub'

    return 'Connect GitHub'
  })
</script>
