<template>
  <v-container class="h-100">
    <VoCard
      prepend-icon="mdi-list-status"
      title="All Users"
    >
      <template #append>
        <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          width="300"
        />
      </template>

      <v-data-table
        v-model:search="search"
        fixed-footer
        :headers="headers"
        :items="users"
        :loading="isLoading.has('index')"
      >
        <template #item.id="{ item }">
          <div class="text-truncate">{{ item.id }}</div>
        </template>

        <template #item.isAdmin="{ item }">
          <UsersStatusChip
            :loading="isLoading.has(item.id)"
            :user="item"
            @update:model-value="val => onUpdateUser(val, item)"
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
    </VoCard>
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
  const isLoading = shallowRef(new Set())

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
      isLoading.value.add('index')

      const res = await http.get<{ users: User[] }>('/one/admin/users')

      users.value = res.users
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value.delete('index')
    }
  })

  async function onUpdateUser (val: boolean | null, item: User) {
    try {
      isLoading.value.add(item.id)

      const res = await http.post<{ user: User }>(`/one/admin/users/${item.id}`, {
        ...item,
        isAdmin: val,
      })

      const index = users.value.findIndex(user => user.id === res.user.id)

      users.value[index] = res.user
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value.delete(item.id)
    }
  }
</script>
