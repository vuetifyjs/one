<template>
  <v-hover>
    <template #default="{ isHovering, props: activatorProps }">
      <VoListItem
        v-bind="activatorProps"
        class="py-4 mb-0"
      >
        <template #prepend>
          <div class="ps-3 text-subtitle-2 pe-2">{{ notification.metadata.emoji }}</div>
        </template>

        <template #append>
          <v-responsive class="mt-n3" width="56">
            <v-tooltip
              location="bottom"
              :text="isRead(notification.slug) ? 'Mark as unread' : 'Mark as read'"
            >
              <template #activator="{ props: tooltipActivatorProps }">
                <v-fade-transition hide-on-leave>
                  <v-btn
                    v-show="isHovering || display.mobile.value"
                    v-bind="tooltipActivatorProps"
                    class="ms-auto"
                    :icon="`svg:${!isRead(notification.slug) ? mdiEmailOpenOutline : mdiEmailVariant}`"
                    mdi-email-variant
                    size="small"
                    variant="text"
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
          v-bind="link"
          border
          label
          size="small"
          :text="notification.metadata.action_text"
          variant="text"
        >
          <template #append>
            <v-icon size="12" />
          </template>
        </v-chip>
      </VoListItem>
    </template>
  </v-hover>
</template>

<script setup lang="ts">
  // Icons
  import { mdiEmailOpenOutline, mdiEmailVariant, mdiOpenInNew } from '@mdi/js'

  // Types
  import type { Notification } from '@/stores/notifications'

  interface Props {
    demo?: boolean
    notification: Notification
  }

  const props = defineProps<Props>()

  const user = useUserStore()

  const date = useDate()
  const display = useDisplay()

  const link = computed(() => {
    const metadata = props.notification.metadata ?? { action: '' }

    return {
      href: metadata.action.startsWith('http') ? metadata.action : undefined,
      target: metadata.action.startsWith('http') ? '_blank' : undefined,
      to: !metadata.action.startsWith('http') ? metadata.action : undefined,
      ...props.notification.metadata.attributes,
      onClick () {
        if (
          props.demo ||
          user.notifications.read.includes(props.notification.slug)
        ) return

        user.notifications.read.push(props.notification.slug)
      },
    }
  })

  function isRead (slug: string) {
    return user.notifications.read.includes(slug)
  }

  function onClick (notification: Notification) {
    if (props.demo) return

    if (!isRead(notification.slug)) {
      user.notifications.read.push(notification.slug)
    } else {
      user.notifications.read = user.notifications.read.filter(slug => slug !== notification.slug)
    }
  }
</script>
