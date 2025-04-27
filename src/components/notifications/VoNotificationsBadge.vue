<template>
  <v-badge
    color="error"
    :content="notifications.unread.length"
    :model-value="user.notifications.show && notifications.unread.length > 0"
  >
    <slot />
  </v-badge>
</template>

<script lang="ts" setup>
  const notifications = useNotificationsStore()
  const user = useUserStore()
</script>
