<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiHandHeart}`"
    title="Sponsorships"
  >
    <v-layout>
      <v-main scrollable>
        <div class="px-3 pb-5 d-flex flex-column h-100">
          <v-card-text class="flex-0-0 mb-16 mb-sm-4">
            <VoDialogSubheader
              text="Support Vuetify through GitHub Sponsors, Discord, or Patreon to unlock exclusive benefits and content."
              title="Support Vuetify"
            />

            <VoSponsorshipsTimeline />
          </v-card-text>

          <v-empty-state
            class="flex-1-0"
            icon="$vuetify"
            min-height="auto"
            size="128"
          >
            <template #media>
              <v-icon :color="auth.isSubscriber ? 'success' : 'error'" />
            </template>

            <template #title>
              One Status:

              <span class="font-weight-black">{{ auth.isSubscriber ? 'Active' : 'Inactive' }}</span>
            </template>

            <template #text>
              <div class="text-caption text-medium-emphasis">
                {{ auth.isSubscriber ? 'You are currently receiving benefits from Vuetify One.' : 'Login to activate Vuetify One benefits' }}
              </div>
            </template>
          </v-empty-state>
        </div>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiHandHeart } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })

  const query = useQuery()
  const auth = useAuthStore()
  const one = useOneStore()

  watch(query, async () => {
    if (query.value.one !== 'sponsorships') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>
