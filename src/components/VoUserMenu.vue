<template>
  <v-card
    class="pb-6"
    rounded="lg"
    width="300"
  >
    <v-sheet
      color="surface-light"
      height="88"
    />

    <div class="text-center mt-n9">
      <v-avatar
        size="72"
        color="surface-variant"
        :image="auth.user?.picture"
        class="mb-2 border-surface border-lg border-opacity-100"
        text="Foobar"
      >
        <v-icon size="x-large" icon="$vuetify" class="mt-1" />
      </v-avatar>

      <div class="text-h6">
        {{ auth.user?.name ?? 'Guest' }}
      </div>
    </div>

    <div class="d-flex align-center justify-center pa-4 ga-2">
      <v-btn
        density="comfortable"
        :icon="`svg:${mdiCogOutline}`"
        color="primary"
        class="text-caption"
      />

      <!-- <v-btn
        density="comfortable"
        :icon="`svg:${mdiBellOutline}`"
        color="primary"
        class="text-caption"
      />

      <v-btn
        density="comfortable"
        :icon="`svg:${mdiCreditCardOutline}`"
        color="primary"
        class="text-caption"
      /> -->
    </div>

    <v-card
      class="ma-3 mb-6"
      :color="social || (!auth.user && !auth.isLoading) ? 'surface-light' : 'surface'"
      variant="tonal"
      rounded="lg"
    >
      <v-list
        class="py-0"
        color="surface-light"
        slim
      >
        <v-list-item
          :link="auth.user"
          @click="social = !social"
        >
          <template #prepend>
            <v-icon :icon="`svg:${auth.user && user.syncSettings ? mdiSync : mdiSyncOff}`" size="x-small" />
          </template>

          <v-list-item-title class="text-caption">
            {{ auth.user && user.syncSettings ? 'Sync is on' : 'Sync is paused' }}

          </v-list-item-title>

          <template #append>
            <v-fade-transition>
              <v-switch
                v-if="auth.user && (social || !user.syncSettings)"
                v-model="user.syncSettings"
                hide-details
                inset
                density="compact"
                :color="user.syncSettings ? 'success' : undefined"
                @click.stop
              >
                <template #thumb>
                  <v-avatar :color="user.syncSettings ? 'success' : undefined" />
                </template>
              </v-switch>
            </v-fade-transition>
          </template>
        </v-list-item>

        <v-expand-transition>
          <div v-if="(!auth.user && !auth.isLoading) || social">
            <v-divider />

            <div class="pa-4 d-flex flex-column ga-4">
              <VoGithubLogin />

              <VoDiscordLogin />
            </div>
          </div>
        </v-expand-transition>
      </v-list>
    </v-card>

    <v-card-subtitle class="text-wrap text-caption text-center px-10">
      Sign in with to save your settings and unlock exclusive subscriber perks.
    </v-card-subtitle>

    <!-- <div class="d-flex justify-center">
      <v-btn></v-btn>
    </div> -->

    <!-- <v-list
      class="py-1"
      rounded="t"
    >
      <VoDashboardListItem />

      <VoNotificationsListItem />
    </v-list> -->
  </v-card>
</template>

<script setup>
  import { mdiBellOutline, mdiCogOutline, mdiCreditCardOutline, mdiSync, mdiSyncOff, mdiViewDashboardOutline, mdiWeatherNight } from '@mdi/js'
  import VoDiscordLogin from '@/components/VoDiscordLogin.vue'
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'
  import VoGithubLogin from '@/components/VoGithubLogin.vue'

  import { shallowRef, watch } from 'vue'

  const auth = useAuthStore()
  const user = useUserStore()
  const social = shallowRef(false)

  watch(() => user.syncSettings, (val, oldVal) => {
    if (val && oldVal === false) social.value = true
  })
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
