<template>
  <VoDialog
    :prepend-icon="`svg:${mdiHandHeart}`"
    max-height="820"
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

            <v-timeline
              class="justify-start ms-n7"
              line-inset="12"
              side="end"
              style="grid-template-columns: auto auto 1fr;"
              truncate-line="both"
            >
              <v-timeline-item
                :dot-color="one.github?.isActive ? 'success' : 'transparent'"
                :icon="one.github?.isActive ? `svg:${mdiCheck}` : undefined"
                size="x-small"
                width="100%"
              >
                <v-card
                  :prepend-avatar="settings.CDN_URL + '/logos/github.png'"
                  rounded="lg"
                  subtitle="Support Vuetify through GitHub sponsors."
                  title="GitHub Sponsors"
                  variant="text"
                  border
                >
                  <template #append>
                    <div class="ps-16">
                      <VoBtn
                        :color="one.github?.isActive ? 'success' : 'primary'"
                        :href="one.github?.isActive ? undefined : 'https://github.com/sponsors/johnleider'"
                        :prepend-icon="`svg:${one.github?.isActive ? mdiCheckCircleOutline : mdiInformationOutline}`"
                        :readonly="one.github?.isActive"
                        :target="one.github?.isActive ? undefined : '_blank'"
                        :text="one.github?.isActive ? 'Active' : 'Info'"
                        width="88"
                      />
                    </div>
                  </template>

                  <template v-if="one.github?.isActive">
                    <v-divider />

                    <v-card-text class="d-flex justify-space-between align-center flex-wrap">
                      <v-chip
                        :prepend-icon="`svg:${mdiMedal}`"
                        :text="one.github.tierName"
                        color="surface-variant"
                        size="small"
                        variant="text"
                        label
                      />

                      <div class="text-caption text-end">
                        Sponsor since

                        <span class="font-weight-bold">
                          {{ format(one.github.createdAt) }}
                        </span>
                      </div>
                    </v-card-text>
                  </template>
                </v-card>
              </v-timeline-item>

              <v-timeline-item
                :dot-color="one.discord?.isActive ? 'success' : 'transparent'"
                :icon="one.discord?.isActive ? `svg:${mdiCheck}` : undefined"
                size="x-small"
                width="100%"
              >
                <v-card
                  :prepend-avatar="settings.CDN_URL + '/logos/discord.png'"
                  rounded="lg"
                  subtitle="Support Vuetify through Discord."
                  title="Discord Subscriber"
                  variant="text"
                  border
                >
                  <template #append>
                    <div class="ps-16">
                      <VoBtn
                        :color="one.discord?.isActive ? 'success' : 'primary'"
                        :href="one.discord?.isActive ? undefined : 'https://discord.com/servers/vuetify-340160225338195969'"
                        :prepend-icon="`svg:${one.discord?.isActive ? mdiCheckCircleOutline : mdiInformationOutline}`"
                        :readonly="one.discord?.isActive"
                        :target="one.discord?.isActive ? undefined : '_blank'"
                        :text="one.discord?.isActive ? 'Active' : 'Info'"
                        width="88"
                      />

                    </div>
                  </template>

                  <template v-if="one.discord?.isActive">
                    <v-divider />

                    <v-card-text class="d-flex justify-space-between align-center flex-wrap">
                      <v-chip
                        :prepend-icon="`svg:${mdiMedal}`"
                        :text="one.discord.tierName"
                        color="surface-variant"
                        size="small"
                        variant="text"
                        label
                      />

                      <div class="text-caption text-end">
                        Subscriber since

                        <span class="font-weight-bold">
                          {{ format(one.discord.createdAt) }}
                        </span>
                      </div>
                    </v-card-text>
                  </template>
                </v-card>
              </v-timeline-item>

              <v-timeline-item
                :dot-color="one.patreon?.isActive ? 'success' : 'transparent'"
                :icon="one.patreon?.isActive ? `svg:${mdiCheck}` : undefined"
                size="x-small"
                width="100%"
              >
                <v-card
                  :prepend-avatar="settings.CDN_URL + '/logos/patreon.png'"
                  rounded="lg"
                  subtitle="Support Vuetify through Patreon."
                  title="Patreon Subscriber"
                  variant="text"
                  border
                >
                  <template #append>
                    <div class="ps-16">
                      <VoBtn
                        :text="one.patreon?.isActive ? 'Active' : 'Coming Soon'"
                        color="surface-variant"
                        readonly
                      />

                    </div>
                  </template>

                  <template v-if="one.patreon?.isActive">
                    <v-divider />

                    <v-card-text class="d-flex justify-space-between align-center flex-wrap">
                      <v-chip
                        :prepend-icon="`svg:${mdiMedal}`"
                        :text="one.patreon.tierName"
                        color="success"
                        variant="text"
                        label
                      />

                      <div class="text-caption text-end">
                        Sponsor since

                        <span class="font-weight-bold">
                          {{ format(one.patreon.createdAt) }}
                        </span>
                      </div>
                    </v-card-text>
                  </template>
                </v-card>
              </v-timeline-item>
            </v-timeline>
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
  // Composables
  import { useDate } from 'vuetify'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useOneStore } from '@/store/one'
  import { useSettingsStore } from '@/store/settings'

  // Icons
  import { mdiChartLine, mdiCheck, mdiCheckCircleOutline, mdiHandHeart, mdiInformationOutline, mdiMedal } from '@mdi/js'

  const adapter = useDate()
  const auth = useAuthStore()
  const one = useOneStore()
  const settings = useSettingsStore()

  function format (created: Date) {
    return adapter.format(created, 'fullDateWithWeekday')
  }
</script>
