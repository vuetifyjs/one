<template>
  <v-container>
    <h1>Banners</h1>

    <v-data-table
      :headers="headers"
      :items="banners.aall"
      :loading="banners.isLoading"
      :sort-by="[{ key: 'metadata.end_date', order: 'desc' }]"
    >
      <template #item.metadata.active="{ item }">
        <AppChip :color="item.metadata.active ? 'success' : 'error'">
          {{ item.metadata.active ? 'Active' : 'Inactive' }}
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
        />
      </template>
    </v-data-table>
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
    },
    {
      title: 'Actions',
      key: 'actions',
    },
  ]

  onMounted(() => {
    banners.admin()
  })
</script>
