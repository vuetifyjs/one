<template>
  <v-sheet
    v-if="hasBadges"
    class="align-center position-absolute ms-2 d-flex ga-2 pa-2"
    color="rgba(0,0,0,.54)"
    rounded="lg"
    style="left: 0;"
  >
    <v-tooltip
      v-if="auth.user?.isAdmin"
      location="bottom"
      text="Vuetify Administrator"
    >
      <template #activator="{ props: activatorProps }">
        <v-icon
          color="blue"
          icon="$vuetify"
          v-bind="activatorProps"
          size="16"
        />
      </template>
    </v-tooltip>

    <v-tooltip
      v-if="one.isSubscriber"
      location="bottom"
      text="Vuetify One Subscriber"
    >
      <template #activator="{ props: activatorProps }">
        <v-icon
          color="amber-darken-2"
          :icon="`svg:${mdiCrown}`"
          v-bind="activatorProps"
          size="16"
        />
      </template>
    </v-tooltip>

    <v-tooltip
      v-if="one.github"
      location="bottom"
      text="GitHub Sponsor"
    >
      <template #activator="{ props: activatorProps }">
        <v-icon
          color="white"
          icon="$github"
          v-bind="activatorProps"
          size="16"
        />
      </template>
    </v-tooltip>

    <v-tooltip
      v-if="one.discord"
      location="bottom"
      text="Discord Subscriber"
    >
      <template #activator="{ props: activatorProps }">
        <v-icon
          color="white"
          icon="$discord"
          v-bind="activatorProps"
          size="16"
        />
      </template>
    </v-tooltip>
  </v-sheet>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiCrown } from '@mdi/js'

  const auth = useAuthStore()
  const one = useOneStore()

  const hasBadges = computed(() => {
    return one.github || one.discord || one.isSubscriber || auth.user?.isAdmin
  })
</script>
