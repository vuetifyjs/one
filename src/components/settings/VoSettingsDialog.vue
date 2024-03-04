<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCog}`"
    max-height="900"
    title="Settings"
  >
    <v-layout>
      <v-main scrollable>
        <v-card-text class="px-7">
          <VoDialogSubheader
            text="Customize your documentation experience with light and dark themes, as well as a combination of both named."
            title="Theme"
          />

          <v-item-group v-model="user.theme" mandatory>
            <v-row dense>
              <v-col
                v-for="(item, i) in items"
                :key="i"
                cols="6"
              >
                <v-item :value="item.value">
                  <template #default="{ toggle, isSelected }">
                    <v-hover>
                      <template #default="{ props: activatorProps, isHovering }">
                        <v-card
                          :color="isSelected ? 'primary' : 'surface-variant'"
                          :image="item.image"
                          :prepend-icon="item.prependIcon"
                          :subtitle="item.subtitle"
                          :title="item.title"
                          height="76"
                          variant="tonal"
                          v-bind="activatorProps"
                          @click="toggle"
                        >
                          <template #image>
                            <v-img
                              :style="{
                                filter: isSelected || isHovering ? 'none' : 'grayscale(100%)',
                              }"
                            />
                          </template>
                        </v-card>
                      </template>
                    </v-hover>
                  </template>
                </v-item>
              </v-col>
            </v-row>
          </v-item-group>

          <v-divider class="mt-6 mb-4 " />

          <VoSettingsPageSuitOption />
        </v-card-text>

        <v-divider />

        <v-card-text class="px-7">
          <VoDialogSubheader
            text="These options change your browsing experience within Vuetify properties"
            title="Experience"
          />

          <VoSwitch
            v-if="auth.isSubscriber"
            v-model="user.disableAds"
            class="mb-2"
            label="Disable Ads"
            messages="Disable traditional advertisements on all documentation pages."
          />

          <!-- <v-expand-transition>
              <div
                v-show="user.disableAds"
                class="ms-5"
              >
                <VoSwitch

                  v-model="user.disableHouseAds"
                  class="mb-2"
                  label="Disable House Ads"
                  messages="These advertisements are for Vuetify products and services only."
                />

                <VoSwitch
                  v-model="user.disableSponsorAds"
                  label="Disable Sponsor Ads"
                  messages="These advertisements are for Vuetify sponsors and partners."
                />
              </div>
            </v-expand-transition> -->

          <VoSwitch
            v-model="user.quickbar"
            label="Enable Quick Actions"
            messages="Quick actions are located on the Vuetify One user menu and provide quick access to common tasks."
          />
        </v-card-text>

        <v-divider />

        <v-card-text v-if="auth.isSubscriber" class="px-7">
          <VoDialogSubheader
            text="Vuetify will communicate with you through banners and notifications. You can disable these features here or reset your local notification cache."
            title="Communication"
          />

          <VoSwitch
            v-model="user.notifications.show"
            class="mb-2"
            label="Enable Notifications"
            messages="Notifications are short form messages that provide information about new releases, updates, and other important information."
          />

          <VoSwitch
            v-if="user.notifications.show"
            v-model="user.notifications.banners"
            class="mb-2"
            label="Enable Banners"
            messages="Banners are located at the top of the screen and provide a callout for important information."
          />
        </v-card-text>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Icons
  import {
    mdiCog,
    mdiContrastCircle,
    mdiDesktopTowerMonitor,
    mdiImageFilterHdr,
    mdiRocketLaunchOutline,
    mdiSpaceInvaders,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
  } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })
  const auth = useAuthStore()
  const user = useUserStore()

  const items = [
    {
      title: 'Light',
      subtitle: 'A standard light theme.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/4a3c1c07-fccc-48aa-a21a-fada102d5335',
      prependIcon: `svg:${mdiWhiteBalanceSunny}`,
      value: 'light',
    },
    {
      title: 'Dark',
      subtitle: 'A standard dark theme.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/2bab9057-ec65-49f3-b112-7256670750b5',
      prependIcon: `svg:${mdiWeatherNight}`,
      value: 'dark',
    },
    {
      title: 'High Contrast',
      subtitle: 'A theme for high contrast.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/cdc13d85-2241-48a3-88cd-3797892f182e',
      prependIcon: `svg:${mdiContrastCircle}`,
      value: 'highContrast',
    },
    {
      title: 'System',
      subtitle: 'A theme based on the system preference.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/8657c3e2-21ff-4313-af1c-59bd7aa693a8',
      prependIcon: `svg:${mdiDesktopTowerMonitor}`,
      value: 'system',
    },
    {
      title: 'Blackguard',
      subtitle: 'A theme for v3.4 Blackguard.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/80c9c2d7-5ad0-4c4b-b8bc-5835f6339f7f',
      prependIcon: `svg:${mdiSpaceInvaders}`,
      value: 'blackguard',
    },
    {
      title: 'Polaris',
      subtitle: 'A theme for v3.5 Polaris.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/d9fc169c-cba5-436c-96a9-d0a9ae5fb697',
      prependIcon: `svg:${mdiImageFilterHdr}`,
      value: 'polaris',
    },
    {
      title: 'Nebula',
      subtitle: 'A theme for v3.6 Nebula.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/a984068c-3180-4041-86ba-3c15a9293dfc',
      prependIcon: `svg:${mdiRocketLaunchOutline}`,
      value: 'nebula',
    },
  ]
</script>
