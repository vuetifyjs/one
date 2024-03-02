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

    <VoDialog
      v-model="dialog"
      :prepend-icon="`svg:${mdiBell}`"
      title="Notifications"
    >
      <v-layout>
        <v-navigation-drawer
          width="175"
          absolute
          floating
        >
          <v-list
            v-model:selected="list"
            class="px-4 pt-4"
            density="compact"
            mandatory
            nav
          >
            <VoListItem
              :prepend-icon="`svg:${mdiInboxOutline}`"
              title="Unread"
              value="0"
            >
              <template v-if="notifications.unread.length > 0" #append>
                <span class="text-caption">
                  {{ notifications.unread.length }}
                </span>
              </template>
            </VoListItem>

            <VoListItem
              :prepend-icon="`svg:${mdiInboxFullOutline}`"
              title="Read"
              value="1"
              mdi-archive-outline
            />
          </v-list>
        </v-navigation-drawer>

        <v-main scrollable>
          <v-window v-model="list">
            <v-window-item value="0">
              <VoNotificationList :items="notifications.unread" />
            </v-window-item>

            <v-window-item value="1">
              <VoNotificationList :items="notifications.read" />
            </v-window-item>
          </v-window>
        </v-main>
      </v-layout>
    </VoDialog>
  </VoListItem>
</template>

<script setup lang="ts">
  // Utilities
  import { onMounted, shallowRef } from 'vue'

  // Stores
  import { useNotificationsStore } from '@/store/notifications'
  import { useUserStore } from '@/store/user'

  // Icons
  import {
    mdiBell,
    mdiBellOutline,
    mdiInboxFullOutline,
    mdiInboxOutline,
  } from '@mdi/js'

  const user = useUserStore()
  const notifications = useNotificationsStore()
  const list = shallowRef(['0'])
  const dialog = shallowRef(false)

  onMounted(async () => {
    await notifications.get()
  })
</script>
