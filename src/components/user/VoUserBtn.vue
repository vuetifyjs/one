<template>
  <v-btn
    :loading="auth.isLoading"
    class="vo-user-btn"
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
  // Utilities
  import { computed } from 'vue'

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

  const items = computed(() => {
    return [
      { title: 'Options', type: 'subheader' },
      {
        title: 'My Dashboard',
        appendIcon: `svg:${mdiViewDashboard}`,
        to: props.external ? undefined : '/user/dashboard',
        href: props.external ? 'https://vuetifyjs.com/user/dashboard/' : undefined,
        target: props.external ? '_blank' : undefined,
      },
      {
        title: 'My Subscriptions',
        appendIcon: '$vuetify',
        href: 'https://vuetifyjs.com/user/subscriptions/',
        target: '_blank',
      },
      {
        title: 'Logout',
        appendIcon: `svg:${mdiLogoutVariant}`,
        onClick: () => {
          auth.logout()
        },
      },
    ]
  })
</script>

<style lang="sass" scoped>
  .vo-user-btn
    :deep(.v-skeleton-loader__avatar)
      min-height: 40px
      height: 40px
      width: 40px
      max-height: 40px
      min-width: 40px
      max-width: 40px
</style>
