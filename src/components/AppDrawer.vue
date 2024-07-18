<template>
  <v-navigation-drawer
    expand-on-hover
    :floating="!!settings.suit['drawer']"
    :image="settings.suit['drawer']"
    :permanent="!$vuetify.display.xs"
    :rail="$vuetify.display.mobile && !$vuetify.display.xs"
  >
    <v-list
      color="primary"
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
      title: 'Logs',
      prependIcon: 'mdi-message-text-clock',
      to: '/logs/',
    },
  ])

  const items = computed(() => {
    return (auth.user?.isAdmin) ? [...links, ...admin.value] : links
  })
</script>
