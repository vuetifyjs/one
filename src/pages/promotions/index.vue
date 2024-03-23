<template>
  <v-container>
    <VoCard
      prepend-icon="mdi-list-status"
      title="All Promotions"
    >
      <template #append>
        <VoBtn
          prepend-icon="mdi-plus-circle"
          text="Create"
          to="/promotions/create"
        />
      </template>

      <v-data-table
        :headers="headers"
        :items="promotions.aall"
        :loading="promotions.isLoading"
        :sort-by="[{ key: 'metadata.end_date', order: 'desc' }]"
      >
        <template #item.metadata.active="{ item }">
          <AppChip :color="item.metadata.active ? 'success' : 'error'">
            {{ item.metadata.active ? 'Active' : 'Inactive' }}
          </AppChip>
        </template>

        <template #item.title="{ item }">
          <v-avatar
            class="me-2"
            :image="item.metadata.images?.default?.url"
            size="24"
            tile
          />

          {{ item.title }}
        </template>

        <template #item.metadata.start_date="{ item }">
          {{ adapter.format(item.metadata.startdate, 'normalDateWithWeekday') }}
        </template>

        <template #item.metadata.end_date="{ item }">
          {{ adapter.format(item.metadata.enddate, 'normalDateWithWeekday') }}
        </template>

        <template #item.actions="{ item }">
          <VoBtn
            prepend-icon="$edit"
            text="Edit"
            :to="{
              name: '/promotions/[id]',
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
  const promotions = usePromotionsStore()
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
      title: 'Slug',
      key: 'slug',
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
      title: 'Actions',
      key: 'actions',
      align: 'end',
    },
  ] as const

  onMounted(() => {
    promotions.admin()
  })
</script>
