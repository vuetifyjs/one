<template>
  <v-btn
    class="vo-user-btn"
    :loading="auth.isLoading"
    icon
  >
    <v-menu
      :disabled="!auth.user || auth.isLoading"
      activator="parent"
      location="bottom end"
    >
      <v-list
        :items="items"
        :lines="false"
        density="compact"
        item-props
        nav
      >
        <template #subheader="{ props: subheaderProps }">
          <v-list-subheader class="text-high-emphasis text-uppercase font-weight-black">
            {{ subheaderProps.title }}
          </v-list-subheader>
        </template>
      </v-list>
    </v-menu>

    <v-avatar v-if="auth.user" :image="user.avatar || auth.user.picture || ''" />

    <template #loader>
      <v-skeleton-loader type="avatar" />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
  // Components
  import {
    VAvatar,
    VBtn,
    VList,
    VListSubheader,
    VMenu,
    VSkeletonLoader,
  } from 'vuetify/components'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiLogoutVariant, mdiViewDashboard } from '@mdi/js'

  const props = defineProps({
    external: Boolean,
  })

  const auth = useAuthStore()
  const user = useUserStore()

  const items = [
    { title: 'Options', type: 'subheader' },
    {
      title: 'My Dashboard',
      appendIcon: `svg:${mdiViewDashboard}`,
      to: props.external ? undefined : '/user/dashboard',
      href: props.external ? 'https://vuetifyjs.com/user/dashboard/' : undefined,
      target: props.external ? '_blank' : undefined,
    },
    {
      title: 'Logout',
      appendIcon: `svg:${mdiLogoutVariant}`,
      onClick: () => {
        auth.logout()
      },
    },
  ]
</script>

<style lang="sass" scoped>
  .vo-user-btn
    .v-skeleton-loader__avatar
      min-height: 40px
      height: 40px
      width: 40px
      max-height: 40px
      min-width: 40px
      max-width: 40px
</style>
