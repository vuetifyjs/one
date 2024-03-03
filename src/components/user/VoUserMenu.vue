<template>
  <v-card
    rounded="lg"
    width="280"
    border
  >
    <VoUserColors />

    <div class="text-center mt-n9 mb-4">
      <VoUserAvatar />

      <VoUserQuickActions />
    </div>

    <v-divider />

    <VoUserList />

    <v-divider />

    <VoAuthListItem />
  </v-card>
</template>

<script setup lang="ts">
  // Utilities
  import { shallowRef, watch } from 'vue'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const user = useUserStore()
  const social = shallowRef(!auth.user)

  watch(() => user.syncSettings, (val, oldVal) => {
    if (val && oldVal === false) social.value = true
  })

  watch(() => auth.user, val => {
    if (val) social.value = false
  })
</script>
