<template>
  <v-badge
    :content="items"
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
  import { useNotificationsStore } from '@/store/notifications'

  const notifications = useNotificationsStore()

  const items = computed(() => {
    return notifications.unread.length
  })
</script>
