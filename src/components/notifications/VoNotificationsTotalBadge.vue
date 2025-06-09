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
  const auth = useAuthStore()
  const notifications = useNotificationsStore()
  const user = useUserStore()

  const items = computed(() => {
    return user.one.notifications.enabled ? notifications.unread.length : 0
  })
</script>
