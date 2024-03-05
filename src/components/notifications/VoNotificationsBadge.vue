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
  import { useNotificationsStore } from '@/store/notifications'
  import { useUserStore } from '@/store/user'

  const notifications = useNotificationsStore()
  const user = useUserStore()
</script>
