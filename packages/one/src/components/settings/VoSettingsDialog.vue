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

          <v-item-group v-model="user.one.theme" mandatory>
            <v-row density="compact">
              <v-col
                v-for="(item, i) in items"
                :key="i"
                class="d-flex flex-column ga-3"
                cols="12"
                md="6"
              >
                <v-list-subheader class="mb-n4">{{ item.title }}</v-list-subheader>

                <v-item v-for="theme in item.items" :key="theme.value" :value="theme.value">
                  <template #default="{ toggle, isSelected }">
                    <v-hover>
                      <template #default="{ props: activatorProps, isHovering }">
                        <v-card
                          :color="isSelected ? 'primary' : 'surface-variant'"
                          height="76"
                          :image="theme.image"
                          :prepend-icon="theme.prependIcon"
                          :readonly="theme.disabled"
                          :ripple="!theme.disabled"
                          :subtitle="!theme.disabled ? theme.subtitle : '🔓 Unlock with Vuetify One'"
                          :title="theme.title"
                          variant="tonal"
                          v-bind="activatorProps"
                          @click="onClick(toggle, theme)"
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

          <template v-if="one.isSubscriber">
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
            v-if="one.isSubscriber"
            v-model="disableAds"
            class="mb-2"
            label="Disable Ads"
            messages="Disable traditional advertisements on all documentation pages."
          />

          <v-expand-transition>
            <div
              v-show="disableAds"
              class="ms-5"
            >
              <div class="pb-2">
                <VoSwitch
                  v-model="user.one.ads.house"
                  label="Show House Ads"
                  messages="These advertisements are for Vuetify products and services only."
                />
              </div>
            </div>
          </v-expand-transition>

          <VoSwitch
            v-model="user.one.quicklinks"
            label="Show Pinned Ecosystem Links"
            messages="Display your pinned ecosystem links below your avatar in the user menu."
          />
        </v-card-text>

        <v-divider />

        <v-card-text v-if="one.isSubscriber" class="px-7">
          <VoDialogSubheader
            text="Vuetify will communicate with you through banners and notifications. You can disable these features here or reset your local notification cache."
            title="Communication"
          />

          <VoSwitch
            v-model="user.one.notifications.enabled"
            class="mb-2"
            label="Enable Notifications"
            messages="Notifications are short form messages that provide information about new releases, updates, and other important information."
          />

          <VoSwitch
            v-model="user.one.banners.enabled"
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
    mdiTransmissionTower,
    mdiWeatherNight,
    mdiWhiteBalanceSunny,
  } from '@mdi/js'
  // Utilities
  import { computed } from 'vue'

  const dialog = defineModel('modelValue', { type: Boolean })
  const one = useOneStore()
  const settings = useSettingsStore()
  const user = useUserStore()

  const standard = computed(() => ([
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
      title: 'High Contrast',
      subtitle: 'A theme for high contrast.',
      image: settings.CDN_URL + 'themes/high-contrast.png',
      prependIcon: `svg:${mdiContrastCircle}`,
      value: 'highContrast',
      disabled: !one.isSubscriber,
    },
  ]))

  const releases = computed(() => ([
    {
      title: 'Blackguard',
      subtitle: 'A theme for v3.4 Blackguard.',
      image: settings.CDN_URL + 'themes/blackguard.png',
      prependIcon: `svg:${mdiSpaceInvaders}`,
      value: 'blackguard',
      disabled: !one.isSubscriber,
    },
    {
      title: 'Polaris',
      subtitle: 'A theme for v3.5 Polaris.',
      image: settings.CDN_URL + 'themes/polaris.png',
      prependIcon: `svg:${mdiImageFilterHdr}`,
      value: 'polaris',
      disabled: !one.isSubscriber,
    },
    {
      title: 'Nebula',
      subtitle: 'A theme for v3.6 Nebula.',
      image: settings.CDN_URL + 'themes/nebula.png',
      prependIcon: `svg:${mdiTransmissionTower}`,
      value: 'nebula',
      disabled: !one.isSubscriber,
    },
    {
      title: 'Odyssey',
      subtitle: 'A theme for v3.7 Odyssey.',
      image: settings.CDN_URL + 'themes/odyssey.png',
      prependIcon: `svg:${mdiRocketLaunchOutline}`,
      value: 'odyssey',
      disabled: !one.isSubscriber,
    },
  ]))

  const items = computed(() => ([
    { title: 'Standard', items: standard.value },
    { title: 'Releases', items: releases.value },
  ]))

  const disableAds = computed({
    get: () => !user.one.ads.enabled,
    set: (value: boolean) => {
      user.one.ads.enabled = !value
    },
  })

  const query = useQuery<{ one: string }>()

  watch(query, async () => {
    if (query.value.one !== 'settings') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })

  function onClick (toggle?: () => void, theme?: any) {
    if (theme.disabled) return

    user.one.theme = theme.value

    toggle?.()
  }
</script>
