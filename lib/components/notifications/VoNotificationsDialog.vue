<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiBell}`"
    title="Notifications"
  >
    <v-layout>
      <v-navigation-drawer
        :location="display.mobile.value ? 'top' : 'start'"
        permanent
        :width="display.mobile.value ? 128 : 168"
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
            v-if="banners.all.length > 0 && user.notifications.banners"
            :prepend-icon="`svg:${mdiBillboard}`"
            title="Banners"
            value="banners"
          >
            <template #append>
              <v-badge dot offset-y="-3" />
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
  // Icons
  import { mdiBell, mdiBillboard, mdiInboxFullOutline, mdiInboxOutline } from '@mdi/js'

  const display = useDisplay()
  const query = useQuery<{ one: string }>()

  const banners = useBannersStore()
  const notifications = useNotificationsStore()
  const one = useOneStore()
  const user = useUserStore()

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
