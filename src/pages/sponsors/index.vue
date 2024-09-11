<template>
  <v-container>
    <VoCard
      prepend-icon="mdi-list-status"
      title="All Sponsors"
    >
      <template #append>
        <VoBtn
          prepend-icon="mdi-plus-circle"
          text="Create"
          to="/sponsors/create"
        />
      </template>

      <v-data-table
        :headers="headers"
        :items="sponsors.aall"
        :loading="sponsors.isLoading"
        :sort-by="[{ key: 'metadata.end_date', order: 'desc' }]"
      >
        <template #item.metadata.active="{ item }">
          <AppChip :color="item.metadata.active ? 'success' : 'error'">
            {{ item.metadata.active ? 'Active' : 'Inactive' }}
          </AppChip>
        </template>

        <template #item.title="{ item }">
          <v-avatar
            :image="item.metadata.logolight?.url"
            rounded="sm"
            size="24"
          />

          {{ item.title }}
        </template>

        <template #item.metadata.start_date="{ item }">
          {{ adapter.format(item.metadata.start_date, 'fullDate') }}
        </template>

        <template #item.metadata.end_date="{ item }">
          {{ adapter.format(item.metadata.end_date, 'fullDate') }}
        </template>

        <template #item.actions="{ item }">
          <VoBtn
            prepend-icon="$edit"
            text="Edit"
            :to="{
              name: '/sponsors/[id]',
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
  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const adapter = useDate()
  const sponsors = useSponsorsStore()
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
      title: 'Started sponsoring',
      key: 'metadata.start_date',
    },
    {
      title: 'End date',
      key: 'metadata.end_date',
    },
    {
      title: 'Source',
      key: 'metadata.source',
    },
    {
      title: 'Level',
      key: 'metadata.level.value',
      align: 'end',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'end',
    },
  ] as const

  onMounted(() => {
    sponsors.admin()
  })
</script>
