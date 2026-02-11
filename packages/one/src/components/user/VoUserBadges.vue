<template>
  <v-sheet
    v-if="hasBadges"
    class="align-center position-absolute ms-2 d-flex ga-2 pa-2"
    color="rgba(0,0,0,.54)"
    rounded="lg"
    style="left: 0; top: 8px;"
  >
    <v-icon
      v-if="auth.user?.isAdmin"
      v-tooltip:bottom="'Vuetify Administrator'"
      color="blue"
      icon="$vuetify"
      size="16"
    />

    <v-icon
      v-if="one.isSubscriber"
      v-tooltip:bottom="'Vuetify One Subscriber'"
      color="amber-darken-2"
      :icon="`svg:${mdiCrown}`"
      size="16"
    />

    <v-icon
      v-if="one.github"
      v-tooltip:bottom="'GitHub Sponsor'"
      color="white"
      icon="$github"
      size="16"
    />

    <v-icon
      v-if="one.discord"
      v-tooltip:bottom="'Discord Subscriber'"
      color="white"
      icon="$discord"
      size="16"
    />
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
