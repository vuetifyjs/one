<template>
  <v-navigation-drawer
    :floating="!!settings.suit['drawer']"
    :image="settings.suit['drawer']"
  >
    <v-list
      density="compact"
      item-props
      :items="items"
      nav
      slim
    />
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
  const auth = useAuthStore()
  const route = useRoute()
  const settings = useSettingsStore()

  const links = [
    {
      title: 'Dashboard',
      to: '/user/dashboard/',
      prependIcon: 'mdi-view-dashboard-outline',
    },
  ]

  const admin = computed(() => [
    { type: 'subheader', class: 'mt-4', title: 'Admin' },
    { type: 'divider', class: 'mb-2' },
    {
      title: 'Banners',
      prependIcon: 'mdi-billboard',
      children: [
        { title: 'List', to: '/banners/', exact: route.name === '/banners/create' },
        { title: 'Create', to: '/banners/create' },
      ],
    },
    {
      title: 'Notifications',
      prependIcon: 'mdi-bell',
      children: [
        { title: 'List', to: '/notifications/', exact: route.name === '/notifications/create' },
        { title: 'Create', to: '/notifications/create' },
      ],
    },
    {
      title: 'Promotions',
      prependIcon: 'mdi-tag-multiple',
      children: [
        { title: 'List', to: '/promotions/', exact: route.name === '/promotions/create' },
        { title: 'Create', to: '/promotions/create' },
      ],
    },
    {
      title: 'Sponsors',
      prependIcon: 'mdi-bank',
      disabled: true,
      children: [
        { title: 'List', to: '/sponsors/', exact: route.name === '/sponsors/create' },
        { title: 'Create', to: '/sponsors/create' },
      ],
    },
    {
      title: 'Spots',
      prependIcon: 'mdi-bullhorn',
      children: [
        { title: 'List', to: '/spots/', exact: route.name === '/spots/create' },
        { title: 'Create', to: '/spots/create' },
      ],
    },
    {
      title: 'Users',
      prependIcon: 'mdi-account-group',
      to: '/users/',
    },
    {
      title: 'Vendors',
      prependIcon: 'mdi-storefront',
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
