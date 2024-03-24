<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCog}`"
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
                cols="12"
                md="6"
              >
                <v-item :value="item.value">
                  <template #default="{ toggle, isSelected }">
                    <v-hover>
                      <template #default="{ props: activatorProps, isHovering }">
                        <v-card
                          :color="isSelected ? 'primary' : 'surface-variant'"
                          :disabled="item.disabled"
                          height="76"
                          :image="item.image"
                          :prepend-icon="item.prependIcon"
                          :ripple="!item.disabled"
                          :subtitle="!item.disabled ? item.subtitle : 'In Development'"
                          :title="item.title"
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

          <template v-if="auth.isSubscriber">
            <v-divider class="mt-6 mb-4 " />

            <VoSettingsPageSuitOption />
          </template>
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

          <v-expand-transition>
            <div
              v-show="user.disableAds"
              class="ms-5 mb-2"
            >
              <VoSwitch
                v-model="user.showHouseAds"
                label="Show House Ads"
                messages="These advertisements are for Vuetify products and services only."
              />
            </div>
          </v-expand-transition>

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
            v-model="user.notifications.banners"
            label="Enable Banners"
            messages="Banners are located at the top of the screen and provide a callout for important information."
          />
        </v-card-text>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script setup lang="ts">
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
  const one = useOneStore()
  const settings = useSettingsStore()
  const user = useUserStore()

  const items = [
    {
      title: 'Light',
      subtitle: 'A standard light theme.',
      image: settings.CDN_URL + 'themes/light.png',
      prependIcon: `svg:${mdiWhiteBalanceSunny}`,
      value: 'light',
    },
    {
      title: 'Dark',
      subtitle: 'A standard dark theme.',
      image: settings.CDN_URL + 'themes/dark.png',
      prependIcon: `svg:${mdiWeatherNight}`,
      value: 'dark',
    },
    {
      title: 'System',
      subtitle: 'A theme based on the system preference.',
      image: settings.CDN_URL + 'themes/system.png',
      prependIcon: `svg:${mdiDesktopTowerMonitor}`,
      value: 'system',
    },
    {
      title: 'Blackguard',
      subtitle: 'A theme for v3.4 Blackguard.',
      image: settings.CDN_URL + 'themes/blackguard.png',
      prependIcon: `svg:${mdiSpaceInvaders}`,
      value: 'blackguard',
    },
    {
      title: 'Polaris',
      subtitle: 'A theme for v3.5 Polaris.',
      image: settings.CDN_URL + 'themes/polaris.png',
      prependIcon: `svg:${mdiImageFilterHdr}`,
      value: 'polaris',
    },
    {
      title: 'Nebula',
      subtitle: 'A theme for v3.6 Nebula.',
      image: settings.CDN_URL + 'themes/nebula.png',
      prependIcon: `svg:${mdiRocketLaunchOutline}`,
      value: 'nebula',
    },
    {
      title: 'High Contrast',
      subtitle: 'A theme for high contrast.',
      image: settings.CDN_URL + 'themes/high-contrast.png',
      prependIcon: `svg:${mdiContrastCircle}`,
      value: 'highContrast',
      disabled: true,
    },
  ]
  const query = useQuery<{ one: string }>()

  watch(query, async () => {
    if (query.value.one !== 'settings') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>
