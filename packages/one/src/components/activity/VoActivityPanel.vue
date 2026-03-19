<script lang="ts" setup>
  import { mdiPin, mdiStar } from '@mdi/js'

  interface Activity {
    id: string
    slug: string
    title: string | null
    createdAt: string
    updatedAt: string
    favorite: boolean
    pinned: boolean
    property: string
  }

  const one = useOneStore()
  const adapter = useDate()

  const search = shallowRef('')
  const items = ref<Activity[]>([])

  const headers = [
    { title: 'Title', key: 'title' },
    { title: 'Property', key: 'property' },
    { title: 'Updated', key: 'updatedAt' },
  ]

  const itemsPerPageOptions = [{ value: 10, title: '10' }, { value: 25, title: '25' }]

  const properties: Record<string, { name: string, urlPrefix: string, img: string }> = {
    'default::Bin': {
      name: 'Bin',
      urlPrefix: 'https://bin.vuetifyjs.com/bins',
      img: 'vbin.svg',
    },
    'default::Playground': {
      name: 'Play',
      urlPrefix: 'https://play.vuetifyjs.com/playgrounds',
      img: 'vplay.svg',
    },
    'default::Link': {
      name: 'Link',
      urlPrefix: 'https://link.vuetifyjs.com/links',
      img: 'vlink.svg',
    },
    'default::StudioProject': {
      name: 'Studio',
      urlPrefix: 'https://studio.vuetifyjs.com/projects',
      img: 'vstudio.svg',
    },
  }

  function formatDate (date: string) {
    if (!adapter.isValid(date)) return ''

    return adapter.format(adapter.date(date), 'normalDateWithWeekday')
  }

  onMounted(async () => {
    items.value = await one.recentActivity() ?? []
  })
</script>

<template>
  <div class="px-3 py-3">
    <v-card-text>
      <VoDialogSubheader
        text="View your recent activity across Vuetify properties."
        title="Recent Activity"
      />

      <v-text-field
        v-model="search"
        class="mb-4"
        density="compact"
        hide-details
        label="Search"
        max-width="300"
        prepend-inner-icon="$mdiMagnify"
        rounded="lg"
        variant="outlined"
        flat
      />

      <v-data-table
        class="rounded-xl"
        v-model:search="search"
        :headers="headers"
        :items="items"
        :items-per-page-options="itemsPerPageOptions"
        :loading="one.isLoading"
        item-value="id"
      >
        <template #item.title="{ item }">
          <VoJdenticon :value="item.slug" />

          <a
            :href="properties[item.property]?.urlPrefix + '/' + item.slug"
            class="text-decoration-none ml-2 on-surface"
            target="_blank"
          >
            {{ item.title || item.slug }}

            <v-icon
              v-if="item.pinned"
              color="primary"
              :icon="`svg:${mdiPin}`"
              size="small"
            />

            <v-icon
              v-if="item.favorite"
              color="warning"
              :icon="`svg:${mdiStar}`"
              size="small"
            />
          </a>
        </template>

        <template #item.property="{ item }">
          <v-chip v-if="properties[item.property]" size="small">
            <template #prepend>
              <v-img
                :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/${properties[item.property].img}`"
                class="me-1"
                width="16"
              />
            </template>

            {{ properties[item.property].name }}
          </v-chip>
        </template>

        <template #item.updatedAt="{ item }">
          {{ formatDate(item.updatedAt) }}
        </template>
      </v-data-table>
    </v-card-text>
  </div>
</template>
