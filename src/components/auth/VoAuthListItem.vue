<template>
  <v-card
    :variant="social ? 'tonal' : 'text'"
    class="ma-2"
    rounded="lg"
  >
    <v-list class="py-0">
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
        <v-sheet
          v-if="(!auth.user && !auth.isLoading) || social"
          border="t"
          color="transparent"
        >
          <div class="pa-4 d-flex flex-column ga-4">
            <VoAuthGithub @click="social = false" />

            <VoAuthDiscord @click="social = false" />
          </div>
        </v-sheet>
      </v-expand-transition>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef, watch } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useUserStore } from '@/stores/user'

  // Icons
  import { mdiSync, mdiSyncOff } from '@mdi/js'

  const auth = useAuthStore()
  const user = useUserStore()
  const social = shallowRef(!auth.user && !auth.isLoading)

  watch(() => auth.user, val => {
    social.value = !val
  })

  function onClickSync () {
    if (!auth.user) return

    social.value = !social.value
  }
</script>
