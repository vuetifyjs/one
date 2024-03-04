<template>
  <VoListItem
    v-if="user.notifications.show"
    :active="dialog"
    :prepend-icon="`svg:${mdiBellOutline}`"
    title="Notifications"
    link
  >
    <template v-if="notifications.unread.length" #prepend>
      <v-badge :content="notifications.unread.length" color="error">
        <v-icon />
      </v-badge>
    </template>

    <VoNotificationsDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Utilities
  import { onMounted, shallowRef } from 'vue'

  // Stores
  import { useNotificationsStore } from '@/store/notifications'
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiBellOutline } from '@mdi/js'

  const user = useUserStore()
  const notifications = useNotificationsStore()
  const dialog = shallowRef(false)

  onMounted(async () => {
    await notifications.get()
  })
</script>
