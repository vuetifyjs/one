<template>
  <VoListItem
    v-if="user.one.notifications.enabled"
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiBellOutline}`"
    rounded="lg"
    title="Notifications"
  >
    <template v-if="notifications.unread.length > 0" #prepend>
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
    notifications.index()
    banners.index()
  })
</script>
