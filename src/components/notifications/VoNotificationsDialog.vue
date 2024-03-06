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
          >
            <template v-if="notifications.read.length > 0" #append>
              <span class="text-caption">
                {{ notifications.read.length }}
              </span>
            </template>
          </VoListItem>
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
  import { nextTick, shallowRef, watch } from 'vue'
  import { useQuery } from '@/composables/route'

  // Stores
  import { useNotificationsStore } from '@/store/notifications'
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiBell, mdiInboxFullOutline, mdiInboxOutline } from '@mdi/js'

  const display = useDisplay()
  const query = useQuery()

  const one = useOneStore()
  const notifications = useNotificationsStore()

  const list = shallowRef(['0'])
  const dialog = defineModel('modelValue', { type: Boolean })

  watch(query, async () => {
    if (query.value.one !== 'notifications') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>
