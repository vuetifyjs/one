<template>
  <v-list-item
    base-color="#5b8a3c"
    :prepend-icon="`svg:${mdiStorefront}`"
    rounded="pill"
    slim
    variant="flat"
    @click="auth.login('shopify')"
  >
    <template #title>
      <span class="text-body-2">{{ text }}</span>
    </template>

    <template
      v-if="(!auth.user && auth.lastLoginProvider() === 'shopify')"
      #subtitle
    >
      <div class="text-caption mt-n1">Last Used</div>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  // Icons
  import { mdiStorefront } from '@mdi/js'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('shopify')
  })

  const text = computed(() => {
    if (!auth.user) return 'Login with Shopify'
    if (hasIdentity.value) return 'Connected to Shopify'

    return 'Connect Shopify'
  })
</script>
