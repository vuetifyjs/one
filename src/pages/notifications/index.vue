<template>
  <v-container>
    <h1>Notifications</h1>

    <v-data-table
      :headers="headers"
      :items="notifications.aall"
      :loading="notifications.isLoading"
      :sort-by="[{ key: 'created_at', order: 'desc' }]"
    >
      <template #item.metadata.active="{ item }">
        <AppChip :color="item.metadata.active ? 'success' : 'error'">
          {{ item.metadata.active ? 'Active' : 'Inactive' }}
        </AppChip>
      </template>

      <template #item.title="{ item }">
        <v-avatar
          size="16"
          :text="item.metadata.emoji"
        />

        {{ item.title }}
      </template>

      <template #item.created_at="{ item }">
        {{ adapter.format(item.created_at, 'fullDateWithWeekday') }}
      </template>

      <template #item.actions="{ item }">
        <VoBtn
          prepend-icon="$edit"
          text="Edit"
          :to="{
            name: '/notifications/[id]',
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
  const notifications = useNotificationsStore()
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
      title: 'Created at',
      key: 'created_at',
    },
    {
      title: 'Actions',
      key: 'actions',
    },
  ]

  onMounted(() => {
    notifications.admin()
  })
</script>
