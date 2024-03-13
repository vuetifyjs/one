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
      <v-divider v-if="i !== 0" />

      <VoNotificationsListItem :notification="notification" />
    </template>
  </v-list>
</template>

<script setup lang="ts">
  // Types
  import type { Notification } from '@/stores/notifications'

  interface Props {
    items: Notification[]
  }

  defineProps<Props>()
</script>
