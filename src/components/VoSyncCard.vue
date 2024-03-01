<template>
  <v-card
    class="mx-3"
    color="surface-light"
    rounded="lg"
    variant="tonal"
  >
    <v-list
      class="py-0"
      color="surface-light"
    >
      <v-list-item
        :link="!!auth.user"
        :prepend-icon="`svg:${auth.user && user.syncSettings ? mdiSync : mdiSyncOff}`"
        :title="auth.user && user.syncSettings ? 'Sync is on' : 'Sync is paused'"
        class="mb-0"
        rounded="b-0"
        nav
        slim
        @click="onClickSync"
      >
        <template #prepend>
          <v-icon class="me-n1" />
        </template>

        <template #append>
          <v-fade-transition>
            <v-switch
              v-if="auth.user && (social || !user.syncSettings)"
              v-model="user.syncSettings"
              :color="user.syncSettings ? 'success' : undefined"
              density="compact"
              hide-details
              inset
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
          rounded="0"
          variant="tonal"
          flat
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
  const social = shallowRef(!auth.user && !auth.isLoading)

  watch(() => auth.user, val => {
    if (val) social.value = false
  })

  function onClickSync () {
    if (!auth.user) return

    social.value = !social.value
  }
</script>
