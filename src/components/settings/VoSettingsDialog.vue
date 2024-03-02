<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCog}`"
    title="Settings"
    scrollable
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
            :disabled="!auth.isSubscriber"
            label="Enable Notifications"
            messages="Notifications are short form messages that provide information about new releases, updates, and other important information."
          />

          <br>

          <VoSwitch
            v-model="user.showBanners"
            :disabled="!auth.isSubscriber"
            label="Enable Banners"
            messages="Banners are located at the top of the screen and provide a callout for important information."
          />
        </v-card-text>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script setup lang="ts">
  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { watch } from 'vue'

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
  const theme = useTheme()

  theme.themes.value = {
    ...theme.themes.value,
    blackguard: {
      dark: true,
      colors: {
        background: '#0f0c24',
        primary: '#e7810d',
        surface: '#1e184a',
        info: '#9c27b0',
        accent: '#FF4081',
        success: '#84b38a',
        'surface-light': '#362b89',
        'surface-bright': '#564f8a',
        'surface-variant': '#6458b4',
        'on-surface-variant': '#FFFFFF',
        'primary-darken-1': '#c56e0b',
        secondary: '#8A2BE2',
        'secondary-darken-1': '#7919cb',
        error: '#FF5555',
        warning: '#ffa726',
      },
      variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.10,
        'hover-opacity': 0.08,
        'focus-opacity': 0.12,
        'selected-opacity': 0.12,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.16,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#343434',
        'theme-on-code': '#CCCCCC',
      },
    },
    nebula: {
      dark: true,
      colors: {
        background: '#0a0f1b',
        surface: '#1c1f2a',
        primary: '#4d5b9e',
        'primary-darken-1': '#424a8c',
        secondary: '#7a82d2',
        accent: '#00eaff',
        info: '#29b6f6',
        warning: '#ffeb3b',
        error: '#e91e63',
        success: '#4caf50',
        'on-surface-variant': '#5c6bc0',
        'surface-light': '#2a3c66',
        'secondary-darken-1': '#686f9a',
      },
      variables: {
        'border-color': '#FFFFFF',
        'border-opacity': 0.12,
        'high-emphasis-opacity': 0.87,
        'medium-emphasis-opacity': 0.60,
        'disabled-opacity': 0.38,
        'idle-opacity': 0.10,
        'hover-opacity': 0.08,
        'focus-opacity': 0.12,
        'selected-opacity': 0.12,
        'activated-opacity': 0.12,
        'pressed-opacity': 0.16,
        'dragged-opacity': 0.08,
        'theme-kbd': '#212529',
        'theme-on-kbd': '#FFFFFF',
        'theme-code': '#343434',
        'theme-on-code': '#CCCCCC',
      },
    },
    highContrast: {
      dark: true,
      colors: {
        background: '#000000',
        surface: '#000000',
        primary: '#ffD700',
        'primary-darken-1': '#e6c300',
        secondary: '#00ff00',
        'secondary-darken-1': '#00e600',
        accent: '#ff00ff',
        info: '#31aaff',
        warning: '#ffaa00',
        error: '#ff0000',
        success: '#00ff00',
        'on-surface-variant': '#000000',
        'surface-light': '#f2f2f2',
        'surface-bright': '#e6e6e6',
        'surface-variant': '#cccccc',
      },
      variables: {
        'border-color': '#ffffff',
        'border-opacity': 0.87,
        'high-emphasis-opacity': 1.0,
        'medium-emphasis-opacity': 0.87,
        'disabled-opacity': 0.5,
        'idle-opacity': 0.1,
        'hover-opacity': 0.2,
        'focus-opacity': 0.3,
        'selected-opacity': 0.3,
        'activated-opacity': 0.3,
        'pressed-opacity': 0.4,
        'dragged-opacity': 0.2,
        'theme-kbd': '#000000',
        'theme-on-kbd': '#ffffff',
        'theme-code': '#000000',
        'theme-on-code': '#ffffff',
      },
    },
  }

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

  watch(() => user.theme, val => {
    if (val === 'system') {
      theme.global.name.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      theme.global.name.value = val
    }

    user.theme = val
  })
</script>
