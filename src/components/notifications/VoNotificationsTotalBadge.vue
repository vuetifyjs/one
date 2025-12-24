<template>
  <v-badge
    color="error"
    dot
    location="start top"
    :model-value="hasUnread"
  >
    <slot />
  </v-badge>
</template>

<script setup lang="ts">
  const notifications = useNotificationsStore()
  const user = useUserStore()

  const hasUnread = toRef(() => {
    return user.one.notifications.enabled && notifications.unread.length > 0
  })
</script>
