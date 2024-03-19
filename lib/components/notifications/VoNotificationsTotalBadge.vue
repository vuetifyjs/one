<template>
  <v-badge
    color="error"
    :content="items"
    :dot="!!auth.user"
    location="start top"
    :model-value="items > 0"
  >
    <slot />
  </v-badge>
</template>

<script setup lang="ts">
  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useNotificationsStore } from '@/stores/notifications'
  import { useUserStore } from '@/stores/user'

  const auth = useAuthStore()
  const notifications = useNotificationsStore()
  const user = useUserStore()

  const items = computed(() => {
    return user.notifications.show ? notifications.unread.length : 0
  })
</script>
