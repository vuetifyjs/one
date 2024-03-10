<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiHandHeart}`"
    title="Sponsorships"
  >
    <v-layout>
      <v-main scrollable>
        <div class="px-3 pb-5 d-flex flex-column">
          <v-card-text>
            <VoDialogSubheader
              text="Support Vuetify through GitHub Sponsors, Discord, or Patreon to unlock exclusive benefits and content."
              title="Support Vuetify"
            />

            <VoSponsorshipsTimeline />
          </v-card-text>

          <v-empty-state
            :icon="`svg:${mdiChartLine}`"
            class="mt-auto"
            min-height="auto"
            size="64"
            title="Your Monthly Contributions"
          >
            <template #media>
              <v-icon color="success" />
            </template>

            <template #headline>
              <div class="py-4">
                <template v-if="auth.isSubscriber">
                  ${{ parseFloat(String(one.monthlyTotal)).toFixed(2) }}
                </template>

                <template v-else>
                  $0.00
                </template></div>
            </template>

            <template #text>
              <div class="text-caption text-medium-emphasis">
                A total of $2.99 or more unlocks <span class="font-weight-black">all</span> Vuetify One benefits
              </div>
            </template>
          </v-empty-state>
        </div>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  // Utilities
  import { useQuery } from '@/composables/route'
  import { nextTick, watch } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useOneStore } from '@/stores/one'

  // Icons
  import { mdiChartLine, mdiHandHeart } from '@mdi/js'

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
