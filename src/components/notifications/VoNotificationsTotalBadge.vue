<template>
  <v-badge
    :content="items"
    :dot="!!auth.user"
    :model-value="items > 0"
    color="error"
    location="start top"
  >
    <slot />
  </v-badge>
</template>

<script setup lang="ts">
  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useNotificationsStore } from '@/store/notifications'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const notifications = useNotificationsStore()
  const user = useUserStore()

  const items = computed(() => {
    return user.notifications.show ? notifications.unread.length : 0
  })
</script>
