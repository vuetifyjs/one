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
            value="read"
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
            value="unread"
          >
            <template v-if="notifications.read.length > 0" #append>
              <span class="text-caption">
                {{ notifications.read.length }}
              </span>
            </template>
          </VoListItem>

          <VoListItem
            v-if="banners.all.length > 0"
            :prepend-icon="`svg:${mdiBillboard}`"
            title="Banners"
            value="banners"
          >
            <template #append>
              <v-badge offset-y="-3" dot />
            </template>
          </VoListItem>

        </v-list>
      </v-navigation-drawer>

      <v-main scrollable>
        <v-window v-model="list">
          <v-window-item value="read">
            <VoNotificationsList :items="notifications.unread" />
          </v-window-item>

          <v-window-item value="unread">
            <VoNotificationsList :items="notifications.read" />
          </v-window-item>

          <v-window-item value="banners">
            <VoNotificationsBannerList :items="banners.all" />
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
  import { useBannersStore } from '@/stores/banners'
  import { useOneStore } from '@/stores/one'
  import { useNotificationsStore } from '@/stores/notifications'

  // Icons
  import { mdiBell, mdiBillboard, mdiInboxFullOutline, mdiInboxOutline } from '@mdi/js'

  const display = useDisplay()
  const query = useQuery()

  const banners = useBannersStore()
  const notifications = useNotificationsStore()
  const one = useOneStore()

  const list = shallowRef(['read'])
  const dialog = defineModel('modelValue', { type: Boolean })

  watch(query, async () => {
    if (query.value.one !== 'notifications') {
      if (dialog.value) dialog.value = false

      return
    }

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>
