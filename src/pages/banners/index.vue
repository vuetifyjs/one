<template>
  <v-container>
    <VoCard
      prepend-icon="mdi-list-status"
      title="All Banners"
    >
      <template #append>
        <VoBtn
          prepend-icon="mdi-plus-circle"
          text="Create"
          to="/banners/create"
        />
      </template>

      <v-data-table
        :headers="headers"
        :items="banners.aall"
        :loading="banners.isLoading"
        :sort-by="[{ key: 'metadata.end_date', order: 'desc' }]"
      >
        <template #item.metadata.active="{ item }">
          <AppChip :color="isWithinRange(item) ? 'warning' : item.metadata.active ? 'success' : 'error'">
            {{ isWithinRange(item) ? 'Running' : item.metadata.active ? 'Active' : 'Inactive' }}
          </AppChip>
        </template>

        <template #item.title="{ item }">
          <v-avatar
            :image="item.metadata.images?.logo?.url"
            size="16"
          />

          {{ item.title }}
        </template>

        <template #item.metadata.start_date="{ item }">
          {{ adapter.format(item.metadata.start_date, 'normalDateWithWeekday') }}
        </template>

        <template #item.metadata.end_date="{ item }">
          {{ adapter.format(item.metadata.end_date, 'normalDateWithWeekday') }}
        </template>

        <template #item.metadata.site="{ item }">
          <template v-for="site in item.metadata.site" :key="site">
            <AppChip class="ms-1" color="secondary">
              {{ site }}
            </AppChip>
          </template>
        </template>

        <template #item.actions="{ item }">
          <VoBtn
            prepend-icon="$edit"
            text="Edit"
            :to="{
              name: '/banners/[id]',
              params: { id: item.id },
            }"
            variant="outlined"
          />
        </template>
      </v-data-table>
    </VoCard>
  </v-container>
</template>

<script lang="ts" setup>
  // Utilities
  import { isWithinRange } from '@/util/dates'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const adapter = useDate()
  const banners = useBannersStore()

  const headers = [
    {
      title: 'Status',
      key: 'metadata.active',
      width: 80,
    },
    {
      title: 'Title',
      key: 'title',
    },
    {
      title: 'Starts on',
      key: 'metadata.start_date',
    },
    {
      title: 'Ends on',
      key: 'metadata.end_date',
    },
    {
      title: 'Sites',
      key: 'metadata.site',
      align: 'end',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'end',
    },
  ] as const

  onMounted(() => {
    banners.admin()
  })
</script>
