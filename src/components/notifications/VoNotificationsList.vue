<template>
  <v-list
    class="py-0"
    height="100%"
    lines="three"
  >
    <div v-if="!items.length" class="pt-16">
      <v-empty-state

        icon="$vuetify"
        size="256"
      >
        <template #media>
          <v-icon color="medium-emphasis" />
        </template>

        <template #title>
          <div class="text-medium-emphasis">
            All caught up
          </div>
        </template>
      </v-empty-state>
    </div>

    <template
      v-for="(notification, i) in items"
      v-else
      :key="notification.slug"
    >
      <v-hover>
        <template #default="{ isHovering, props: activatorProps }">
          <VoListItem
            v-bind="activatorProps"
            :border="i !== 0 && 't'"
            class="py-4 mb-0"
          >
            <template #prepend>
              <div class="ps-3 text-subtitle-2 pe-2">{{ notification.metadata.emoji }}</div>
            </template>

            <template #append>
              <v-responsive class="mt-n3" width="56">
                <v-tooltip
                  :text="isRead(notification.slug) ? 'Mark as unread' : 'Mark as read'"
                  location="bottom"
                >
                  <template #activator="{ props: tooltipActivatorProps }">
                    <v-fade-transition hide-on-leave>
                      <v-btn
                        v-show="isHovering || display.mobile.value"
                        v-bind="tooltipActivatorProps"
                        :icon="`svg:${!isRead(notification.slug) ? mdiEmailOpenOutline : mdiEmailVariant}`"
                        class="ms-auto"
                        size="small"
                        variant="text"
                        mdi-email-variant
                        @click="onClick(notification)"
                      />
                    </v-fade-transition>
                  </template>
                </v-tooltip>
              </v-responsive>
            </template>

            <v-list-item-title class="text-wrap text-h6 mb-1">
              <div class=" text-truncate">{{ notification.title }}</div>
            </v-list-item-title>

            <div class="text-caption font-weight-bold text-medium-emphasis">
              {{ date.format(notification.created_at, 'fullDateWithWeekday') }}
            </div>

            <div class="text-disabled text-caption my-2">
              {{ notification.metadata.text }}
            </div>

            <v-chip
              :append-icon="`svg:${mdiOpenInNew}`"
              :href="notification.metadata.action"
              :text="notification.metadata.action_text"
              size="small"
              target="_blank"
              variant="text"
              border
              label
              @click="onClick(notification)"
            >
              <template #append>
                <v-icon size="12" />
              </template>
            </v-chip>
          </VoListItem>
        </template>
      </v-hover>
    </template>
  </v-list>
</template>

<script setup lang="ts">
  // Icons
  import { mdiEmailOpenOutline, mdiEmailVariant, mdiOpenInNew } from '@mdi/js'

  // Types
  import type { Notification } from '@/stores/notifications'

  interface Props {
    items: Notification[]
  }

  const date = useDate()
  const display = useDisplay()

  const user = useUserStore()

  defineProps<Props>()

  function isRead (slug: string) {
    return user.notifications.read.includes(slug)
  }

  function onClick (notification: Notification) {
    if (!isRead(notification.slug)) {
      user.notifications.read.push(notification.slug)
    } else {
      user.notifications.read = user.notifications.read.filter(slug => slug !== notification.slug)
    }
  }
</script>
