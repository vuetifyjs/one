<template>
  <v-dialog
    v-if="!auth.user && !auth.isLoading"
    max-width="480"
  >
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-bind="{
          ...activatorProps,
          [`${lgAndUp ? 'append-' : ''}icon`]: `svg:${mdiLogin}`,
          text: lgAndUp ? 'Login' : undefined,
        }"
        :rounded="mdAndDown"
        class="ms-1 text-none"
        color="primary"
        variant="outlined"
      />
    </template>

    <v-card class="pt-6 pb-1 pb-sm-4 px-4 px-sm-8">
      <v-img
        :src="`https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-${theme.name.value}.svg`"
        class="mb-4"
        height="30"
      />

      <div class="text-center mb-6">
        <v-card-title class="text-h5 mb-1 text-md-h4 font-weight-bold">
          {{ auth.lastLoginProvider() ? 'Welcome Back' : 'Log in to Vuetify' }}
        </v-card-title>

        <v-card-subtitle class="text-wrap">
          Sign in with GitHub or Discord to save your settings and unlock exclusive subscriber perks.
        </v-card-subtitle>
      </div>

      <v-list class="mx-auto" max-width="300" width="100%">
        <VoGithubLogin class="mb-3" />

        <VoDiscordLogin />
      </v-list>
    </v-card>
  </v-dialog>

  <v-btn
    v-else
    id="login-btn"
    :loading="auth.isLoading"
    class="ms-1"
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
        item-props
        density="compact"
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
    VBtn,
    VCard,
    VCardSubtitle,
    VCardTitle,
    VDialog,
    VImg,
    VList,
    VListSubheader,
    VMenu,
    VAvatar,
    VSkeletonLoader,
  } from 'vuetify/components'

  import VoGithubLogin from '@/components/VoGithubLogin.vue'
  import VoDiscordLogin from '@/components/VoDiscordLogin.vue'

  // Composables
  import { useDisplay, useTheme } from 'vuetify'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiLogin, mdiLogoutVariant, mdiViewDashboard } from '@mdi/js'

  const emit = defineEmits(['click:dashboard'])

  const auth = useAuthStore()
  const user = useUserStore()

  const { mdAndDown, lgAndUp } = useDisplay()
  const theme = useTheme()

  const items = [
    { title: 'Options', type: 'subheader' },
    {
      title: 'My Dashboard',
      appendIcon: `svg:${mdiViewDashboard}`,
      onClick: () => {
        emit('click:dashboard')
      },
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

<style lang="sass">
  #login-btn
    .v-skeleton-loader__avatar
      min-height: 40px
      height: 40px
      width: 40px
      max-height: 40px
      min-width: 40px
      max-width: 40px
</style>
