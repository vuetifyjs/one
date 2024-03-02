<template>
  <v-card
    rounded="lg"
    width="300"
    border
  >
    <v-img
      color="surface-light"
      max-height="88"
      min-height="88"
      rounded="0"
      cover
      flat
    />

    <div class="text-center mt-n9 mb-4">
      <VoUserAvatar />
    </div>

    <v-divider />

    <VoUserList />

    <v-divider />

    <div class="py-3">
      <VoSyncCard />
    </div>
  </v-card>
</template>

<script setup>
  import { useAuthStore } from '@/store/auth'
  import { useOneStore } from '@/store/one'
  import { useUserStore } from '@/store/user'

  import { shallowRef, watch } from 'vue'

  const auth = useAuthStore()
  const one = useOneStore()
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
