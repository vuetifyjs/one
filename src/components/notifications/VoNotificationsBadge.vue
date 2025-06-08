<template>
  <v-badge
    color="error"
    :content="notifications.unread.length"
    :model-value="user.one.notifications.enabled && notifications.unread.length > 0"
  >
    <slot />
  </v-badge>
</template>

<script lang="ts" setup>
  const notifications = useNotificationsStore()
  const user = useUserStore()
</script>
