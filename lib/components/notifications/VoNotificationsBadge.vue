<template>
  <v-badge
    :content="notifications.unread.length"
    :model-value="user.notifications.show && notifications.unread.length > 0"
    color="error"
  >
    <slot />
  </v-badge>
</template>

<script lang="ts" setup>
  import { useNotificationsStore } from '@/stores/notifications'
  import { useUserStore } from '@/stores/user'

  const notifications = useNotificationsStore()
  const user = useUserStore()
</script>
@/stores/notifications@/stores/user
