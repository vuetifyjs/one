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
