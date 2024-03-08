<template>
  <VoListItem
    v-if="user.notifications.show"
    :active="dialog"
    :prepend-icon="`svg:${mdiBellOutline}`"
    title="Notifications"
    link
  >
    <template v-if="notifications.unread.length" #prepend>
      <VoNotificationsBadge>
        <v-icon />
      </VoNotificationsBadge>
    </template>

    <VoNotificationsDialog v-model="dialog" />
  </VoListItem>
</template>

<script setup lang="ts">
  // Utilities
  import { onMounted, shallowRef } from 'vue'

  // Stores
  import { useBannersStore } from '@/stores/banners'
  import { useNotificationsStore } from '@/stores/notifications'
  import { useUserStore } from '@/stores/user'

  // Icons
  import { mdiBellOutline } from '@mdi/js'

  const banners = useBannersStore()
  const user = useUserStore()
  const notifications = useNotificationsStore()
  const dialog = shallowRef(false)

  onMounted(async () => {
    notifications.get()
    banners.get()
  })
</script>
