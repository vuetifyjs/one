<template>
  <v-navigation-drawer :image="settings.suit['drawer']">
    <v-list
      :items="items"
      density="compact"
      item-props
      nav
      slim
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  // Composables
  import { useAuthStore } from '@/stores/auth'
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'
  import { useSettingsStore } from '@/stores/settings'

  // Icons
  import { mdiBillboard, mdiViewDashboardOutline } from '@mdi/js'

  const auth = useAuthStore()
  const route = useRoute()
  const settings = useSettingsStore()

  const links = [
    { title: 'Dashboard', to: '/user/dashboard/', prependIcon: `svg:${mdiViewDashboardOutline}` },
  ]

  const admin = computed(() => [
    { type: 'subheader', class: 'mt-4', title: 'Admin' },
    { type: 'divider', class: 'mb-2' },
    {
      title: 'Banners',
      prependIcon: `svg:${mdiBillboard}`,
      children: [
        { title: 'List', to: '/banners/', exact: route.name === '/banners/create' },
        { title: 'Create', to: '/banners/create' },
      ],
    },
  ])

  const items = computed(() => {
    return (auth.user?.isAdmin) ? [...links, ...admin.value] : links
  })
</script>
