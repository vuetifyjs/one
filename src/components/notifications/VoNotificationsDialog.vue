<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiBell}`"
    title="Notifications"
  >
    <v-layout>
      <v-navigation-drawer
        :location="display.mobile.value ? 'top' : 'start'"
        :width="display.mobile.value ? 128 : 168"
        permanent
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
            <VoNotificationsList :items="notifications.unread" />
          </v-window-item>

          <v-window-item value="1">
            <VoNotificationsList :items="notifications.read" />
          </v-window-item>
        </v-window>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script setup lang="ts">
  // Composables
  import { useDisplay } from 'vuetify'
  // Utilities
  import { shallowRef } from 'vue'

  // Stores
  import { useNotificationsStore } from '@/store/notifications'

  // Icons
  import { mdiBell, mdiInboxFullOutline, mdiInboxOutline } from '@mdi/js'

  const notifications = useNotificationsStore()
  const display = useDisplay()

  const list = shallowRef(['0'])
  const dialog = shallowRef(false)
</script>
