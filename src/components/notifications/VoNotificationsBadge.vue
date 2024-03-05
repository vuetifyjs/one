<template>
  <v-badge
    :content="notifications.unread.length"
    :model-value="notifications.unread.length > 0"
    color="error"
  >
    <slot />
  </v-badge>
</template>

<script lang="ts" setup>
  import { useNotificationsStore } from '@/store/notifications'

  const notifications = useNotificationsStore()
</script>
