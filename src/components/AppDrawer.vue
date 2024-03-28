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
      to: '/banners/',
    },
    {
      title: 'Notifications',
      prependIcon: 'mdi-bell',
      to: '/notifications/',
    },
    {
      title: 'Promotions',
      prependIcon: 'mdi-tag-multiple',
      to: '/promotions/',
    },
    {
      title: 'Sponsors',
      prependIcon: 'mdi-bank',
      to: '/sponsors/',
    },
    {
      title: 'Spots',
      prependIcon: 'mdi-bullhorn',
      to: '/spots/',
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
      to: '/vendors/',
    },
  ])

  const items = computed(() => {
    return (auth.user?.isAdmin) ? [...links, ...admin.value] : links
  })
</script>
