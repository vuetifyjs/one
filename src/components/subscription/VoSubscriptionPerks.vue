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
  // Icons
  import { mdiCheck, mdiRocketOutline } from '@mdi/js'

  interface Props {
    type?: 'solo' | 'team'
  }

  const { type } = defineProps<Props>()

  const upnext = [
    'Embeddable playgrounds for your own documentation',
    'Team shared workspaces for bins and playgrounds',
    'Real-time collaboration on bins and playgrounds',
  ]

  const dialog = shallowRef(false)

  const one = useOneStore()

  const perks = computed(() => {
    const array = [
      'Ad-free experience on all Vuetify properties',
      'Save and share across <a href="https://play.vuetifyjs.com" target="_blank">Vuetify Play</a>, <a href="https://bin.vuetifyjs.com" target="_blank">Vuetify Bin</a>, <a href="https://studio.vuetifyjs.com" target="_blank">Vuetify Studio</a>, and <a href="https://link.vuetifyjs.com" target="_blank">Vuetify Link</a>',
      'Pinned pages and rail navigation in <a href="https://vuetifyjs.com/" target="_blank">Documentation</a>',
      'Vuetify MCP API key for AI-assisted development',
    ]

    if (type === 'team') {
      array.unshift('Invite up to 25 team members')
    }

    return array
  })

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })
</script>
