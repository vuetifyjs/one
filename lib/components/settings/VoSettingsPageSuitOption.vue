<template>
  <VoSwitch
    v-model="user.suits.show"
    class="mb-2"
    label="Enable Page suits"
    messages="Customize layout elements with a unique background, styled after one of our themed releases."
  />

  <v-expand-transition>
    <div v-if="user.suits.show">
      <v-select
        v-model="user.suits.suit"
        :items="suits"
        density="compact"
        placeholder="Choose a page suit"
        style="max-width: 300px;"
        variant="outlined"
        clearable
        item-props
        single-line
      >
        <template #selection="{ item }">
          <v-icon :icon="item.props.prependIcon" size="x-small" start />
          {{ item.title }}
        </template>
      </v-select>

      <VoDialogSubheader text="Select your suit elements to display the background image:" />

      <v-chip-group
        v-model="user.suits.elements"
        color="primary"
        filter
        multiple
      >
        <v-chip
          :append-icon="`svg:${mdiHome}`"
          filter-icon="$success"
          text="App Bar"
          value="app-bar"
          variant="flat"
        >
          <template #append>
            <v-divider class="ms-2 border-opacity-50" vertical />

            <v-icon size="x-small" />
          </template>
        </v-chip>

        <v-chip
          :append-icon="`svg:${mdiTextBox}`"
          filter-icon="$success"
          text="Navigation Drawer"
          value="drawer"
          variant="flat"
        >
          <template #append>
            <v-divider class="ms-2 border-opacity-50" vertical />

            <v-icon size="x-small" />
          </template>
        </v-chip>

        <v-chip
          append-icon="$info"
          filter-icon="$success"
          text="Footer"
          value="footer"
          variant="flat"
        >
          <template #append>
            <v-divider class="ms-2 border-opacity-50" vertical />

            <v-icon size="x-small" />
          </template>
        </v-chip>
      </v-chip-group>
    </div>
  </v-expand-transition>
</template>

<script lang="ts" setup>
  // Stores
  import { useUserStore } from '@/stores/user'

  // Icons
  import {
    mdiHome,
    // mdiImageFilterHdr,
    // mdiRocketLaunchOutline,
    mdiSpaceInvaders,
    mdiTextBox,
  } from '@mdi/js'

  const user = useUserStore()
  const suits = [
    {
      title: 'Choose a page suit',
      value: '',
      disabled: true,
    },
    {
      title: 'Blackguard',
      prependIcon: `svg:${mdiSpaceInvaders}`,
      value: 'blackguard',
    },
    // {
    //   title: 'Polaris',
    //   prependIcon: `svg:${mdiImageFilterHdr}`,
    //   value: 'polaris',
    // },
    // {
    //   title: 'Nebula',
    //   prependIcon: `svg:${mdiRocketLaunchOutline}`,
    //   value: 'nebula',
    // },
  ]
</script>
