<template>
  <v-list-item
    base-color="#4285F4"
    :prepend-icon="`svg:${mdiGoogle}`"
    rounded="pill"
    slim
    variant="flat"
    @click="auth.login('google')"
  >
    <template #title>
      <span class="text-body-2">{{ text }}</span>
    </template>

    <template
      v-if="(!auth.user && auth.lastLoginProvider() === 'google')"
      #subtitle
    >
      <div class="text-caption mt-n1">Last Used</div>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  import { mdiGoogle } from '@mdi/js'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('google')
  })

  const text = computed(() => {
    if (!auth.user) return 'Login with Google'
    if (hasIdentity.value) return 'Connected to Google'

    return 'Connect Google'
  })
</script>
