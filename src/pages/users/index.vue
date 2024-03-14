<template>
  <v-container>
    <h1>Users</h1>

    <v-data-table
      :headers="headers"
      :items="users"
    >
      <template #item.id="{ item }">
        <div class="text-truncate">{{ item.id }}</div>
      </template>

      <template #item.isAdmin="{ item }">
        <AppChip v-if="item.isAdmin" color="success" text="Administrator" />
      </template>

      <template #item.name="{ item }">
        <div class="d-flex align-center">
          <v-avatar
            :image="item.picture"
            class="me-1"
            size="16"
          />

          {{ item.name }}
        </div>
      </template>

      <template #item.createdAt="{ item }">
        {{ adapter.format(item.createdAt, 'fullDateWithWeekday') }}
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts" setup>
  // Components
  import { useDate } from 'vuetify'

  // Utilities
  import { definePage } from 'vue-router/auto'
  import { onBeforeMount, ref } from 'vue'

  // Stores
  import { useHttpStore } from '@/stores/http'
  import { User } from '@/stores/auth'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const users = ref<User[]>([])

  const http = useHttpStore()

  const adapter = useDate()

  const headers = [
    {
      title: 'Name',
      value: 'name',
    },
    {
      title: 'Admin',
      value: 'isAdmin',
    },
    {
      title: 'ID',
      value: 'id',
    },
    {
      title: 'Created At',
      value: 'createdAt',
    },
  ]

  onBeforeMount(async () => {
    const res = await http.get<{ users: User[] }>('/one/admin/users')

    users.value = res.users
  })
</script>
