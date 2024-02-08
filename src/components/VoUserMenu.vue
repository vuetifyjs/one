<template>
  <v-card
    border
    rounded="lg"
    width="300"
  >
    <v-sheet
      color="surface-light"
      height="88"
    />

    <div class="text-center mt-n9">
      <VoUserAvatar />
    </div>

    <VoUserQuickActions />

    <template v-if="auth.user">
      <VoUserList />

      <v-divider />
    </template>

    <div class="py-3">
      <VoSyncCard />
    </div>
  </v-card>
</template>

<script setup>
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  import { shallowRef, watch } from 'vue'

  const auth = useAuthStore()
  const user = useUserStore()
  const social = shallowRef(!auth.user)

  watch(() => user.syncSettings, (val, oldVal) => {
    if (val && oldVal === false) social.value = true
  })

  watch(() => auth.user, val => {
    if (val) social.value = false
  })

  function onClickSync () {
    if (!auth.user) return

    social.value = !social.value
  }

  const items = [
    {
      title: 'Dashboard',
      prependIcon: 'mdi-view-dashboard-outline',
    },
    {
      title: 'Notifications',
      prependIcon: 'mdi-inbox-outline',
    },
    {
      title: 'Vuetify One',
      prependIcon: '$vuetify-outline',
    },
    {
      type: 'divider',
      class: 'my-1',
    },
    {
      title: 'Settings',
      prependIcon: 'mdi-cog-outline',
    },
    {
      title: 'Integrations',
      prependIcon: 'mdi-puzzle-outline',
    },
    {
      type: 'divider',
      class: 'my-1',
    },
    {
      title: 'Sign out',
      prependIcon: 'mdi-power',
    },
  ]
</script>
