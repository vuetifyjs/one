<template>
  <v-container>
    <h1>Promotions</h1>

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
          :image="item.metadata.images?.default?.url"
          size="24"
          tile
          class="me-2"
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
        />
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
  // Composables
  import { usePromotionsStore } from '@/stores/promotions'
  import { useDate } from 'vuetify'

  // Utilities
  import { definePage } from 'vue-router/auto'
  import { onMounted } from 'vue'

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
    },
  ]

  onMounted(() => {
    promotions.admin()
  })
</script>
