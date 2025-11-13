<template>
  <v-list-item
    base-color="#1258e2"
    :prepend-icon="`svg:${mdiAccountGroupOutline}`"
    rounded="pill"
    slim
    variant="flat"
    @click="auth.login('opencollective')"
  >
    <template #title>
      <span class="text-body-2">{{ text }}</span>
    </template>

    <template
      v-if="(!auth.user && auth.lastLoginProvider() === 'openCollective')"
      #subtitle
    >
      <div class="text-caption mt-n1">Last Used</div>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
  import { mdiAccountGroupOutline } from '@mdi/js'

  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('opencollective')
  })

  const text = computed(() => {
    if (!auth.user) return 'Login with Open Collective'
    if (hasIdentity.value) return 'Connected to Open Collective'

    return 'Connect Open Collective'
  })
</script>
