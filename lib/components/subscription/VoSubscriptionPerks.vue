<template>
  <v-label class="font-weight-black">Perks</v-label>

  <div class="mb-3 text-caption text-medium-emphasis">
    The Vuetify One subscription comes with the following perks:
  </div>

  <v-list class="py-0" density="compact" :lines="false" nav>
    <VoListItem
      v-for="(perk, i) in perks"
      :key="i"
      class="mb-0"
      :prepend-icon="`svg:${mdiCheck}`"
    >
      <template #prepend>
        <v-icon class="mx-n2" color="success" size="small" />
      </template>

      <template #title>
        <div v-html="perk" />
      </template>
    </VoListItem>
  </v-list>

  <br>

  <v-label class="font-weight-black">Up Next</v-label>

  <div class="mb-3 text-caption text-medium-emphasis">
    The following features are in development and coming soon:
  </div>

  <v-list class="py-0" density="compact" :lines="false" nav>
    <VoListItem
      v-for="(perk, i) in upnext"
      :key="i"
      class="mb-0"
      :prepend-icon="`svg:${mdiRocketOutline}`"
    >
      <template #prepend>
        <v-icon class="mx-n2" size="small" />
      </template>

      <template #title>
        <div v-html="perk" />
      </template>
    </VoListItem>
  </v-list>
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef, watch } from 'vue'

  // Stores
  import { useOneStore } from '@/stores/one'

  // Icons
  import { mdiCheck, mdiRocketOutline } from '@mdi/js'

  const perks = [
    'Ad Free Experience on all Vuetify properties',
    'Save and share code snippets with <a href="https://vbin.io/" target="_blank">VBin</a>',
    'Pinned Navigation Items and Rail drawer in <a href="https://vuetifyjs.com/" target="_blank">Documentation</a>',
    'Customize Navigation components with Page Suits',
    'Custom Vuetify One menu avatar',
  ]
  const upnext = [
    'Special role in the <a href="https://discord.vuetifyjs.com/" target="_blank">Vuetify Discord</a>',
    'Save and share your playgrounds with <a href="https://play.vuetifyjs.com" target="_blank">Vuetify Play</a>',
    'Receive a special label on GitHub created issues and pull requests',
  ]

  const dialog = shallowRef(false)

  const one = useOneStore()

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })
</script>
