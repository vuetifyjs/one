<template>
  <v-card
    class="mx-3"
    color="surface-light"
    variant="tonal"
    rounded="lg"
  >
    <v-list
      class="py-0"
      color="surface-light"
      slim
    >
      <v-list-item
        :link="!!auth.user"
        @click="onClickSync"
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
        <v-card
          v-if="(!auth.user && !auth.isLoading) || social"
          color="rgba(var(--v-theme-primary), 0.5)"
          variant="tonal"
          flat
          rounded="0"
        >
          <div class="pa-4 d-flex flex-column ga-4">
            <VoGithubLogin />

            <VoDiscordLogin />
          </div>
        </v-card>
      </v-expand-transition>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef, watch } from 'vue'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiSync, mdiSyncOff } from '@mdi/js'

  const auth = useAuthStore()
  const user = useUserStore()
  const social = shallowRef(!auth.user)

  watch(() => auth.user, val => {
    if (val) social.value = false
  })

  function onClickSync () {
    if (!auth.user) return

    social.value = !social.value
  }
</script>
