<template>
  <v-container class="h-100">
    <v-card>
      <v-toolbar color="surface-variant" title="All Users">
        <template #append>
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            style="width: 300px"
          />
        </template>
      </v-toolbar>

      <v-data-table
        v-model:search="search"
        fixed-footer
        :headers="headers"
        :items="users"
        :loading="isLoading"
      >
        <template #item.id="{ item }">
          <div class="text-truncate">{{ item.id }}</div>
        </template>

        <template #item.isAdmin="{ item }">
          <AppChip
            v-if="item.isAdmin"
            color="success"
            text="Administrator"
          />
        </template>

        <template #item.name="{ item }">
          <div class="d-flex align-center">
            <v-avatar
              class="me-1"
              :image="item.picture"
              size="16"
            />

            {{ item.name }}
          </div>
        </template>

        <template #item.createdAt="{ item }">
          {{ adapter.format(item.createdAt, 'fullDateWithWeekday') }}
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  // Types
  import type { User } from '@/stores/auth'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const search = shallowRef('')
  const users = ref<User[]>([])
  const isLoading = shallowRef(false)

  const http = useHttpStore()

  const adapter = useDate()

  const headers = [
    {
      title: 'Name',
      value: 'name',
      sortable: true,
    },
    {
      title: 'Admin',
      value: 'isAdmin',
      sortable: true,
    },
    {
      title: 'ID',
      value: 'id',
    },
    {
      title: 'Created At',
      value: 'createdAt',
      sortable: true,
    },
  ]

  onBeforeMount(async () => {
    try {
      isLoading.value = true

      const res = await http.get<{ users: User[] }>('/one/admin/users')

      users.value = res.users
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  })
</script>
