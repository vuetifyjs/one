<template>
  <v-navigation-drawer
    :floating="!!settings.suit['drawer']"
    :image="settings.suit['drawer']"
  >
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
  import { useRoute } from 'vue-router'

  // Utilities
  import { computed } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useSettingsStore } from '@/stores/settings'

  // Icons
  import { mdiAccountGroup, mdiBank, mdiBell, mdiBillboard, mdiBullhorn, mdiStorefront, mdiTagMultiple, mdiViewDashboardOutline } from '@mdi/js'

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
      title: 'Advertisements',
      prependIcon: `svg:${mdiTagMultiple}`,
      disabled: true,
      children: [
        { title: 'List', to: '/advertisements/', exact: route.name === '/advertisements/create' },
        { title: 'Create', to: '/advertisements/create' },
      ],
    },
    {
      title: 'Banners',
      prependIcon: `svg:${mdiBillboard}`,
      children: [
        { title: 'List', to: '/banners/', exact: route.name === '/banners/create' },
        { title: 'Create', to: '/banners/create' },
      ],
    },
    {
      title: 'Notifications',
      prependIcon: `svg:${mdiBell}`,
      children: [
        { title: 'List', to: '/notifications/', exact: route.name === '/notifications/create' },
        { title: 'Create', to: '/notifications/create' },
      ],
    },
    {
      title: 'Sponsors',
      prependIcon: `svg:${mdiBank}`,
      disabled: true,
      children: [
        { title: 'List', to: '/sponsors/', exact: route.name === '/sponsors/create' },
        { title: 'Create', to: '/sponsors/create' },
      ],
    },
    {
      title: 'Spots',
      prependIcon: `svg:${mdiBullhorn}`,
      children: [
        { title: 'List', to: '/spots/', exact: route.name === '/spots/create' },
        { title: 'Create', to: '/spots/create' },
      ],
    },
    {
      title: 'Users',
      prependIcon: `svg:${mdiAccountGroup}`,
      to: '/users/',
    },
    {
      title: 'Vendors',
      prependIcon: `svg:${mdiStorefront}`,
      disabled: true,
      children: [
        { title: 'List', to: '/vendors/', exact: route.name === '/vendors/create' },
        { title: 'Create', to: '/vendors/create' },
      ],
    },
  ])

  const items = computed(() => {
    return (auth.user?.isAdmin) ? [...links, ...admin.value] : links
  })
</script>
