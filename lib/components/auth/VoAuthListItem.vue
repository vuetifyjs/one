<template>
  <v-card
    class="ma-2"
    rounded="lg"
    :variant="social ? 'tonal' : 'text'"
  >
    <v-list class="py-0">
      <v-list-item
        class="mb-0"
        :link="!!auth.user"
        nav
        :prepend-icon="`svg:${auth.user && user.syncSettings ? mdiSync : mdiSyncOff}`"
        rounded="b-0"
        slim
        :title="auth.user && user.syncSettings ? 'Sync is on' : 'Sync is paused'"
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
