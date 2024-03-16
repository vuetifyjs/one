<template>
  <v-container class="h-100">
    <v-card>
      <v-toolbar color="surface-variant" title="All Users">
        <template #append>
          <v-text-field
            v-model="search"
            :prepend-inner-icon="`svg:${mdiMagnify}`"
            label="Search"
            style="width: 300px"
          />
        </template>
      </v-toolbar>

      <v-data-table
        v-model:search="search"
        :headers="headers"
        :items="users"
        :loading="isLoading"
        fixed-footer
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
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
  // Components
  import { useDate } from 'vuetify'

  // Utilities
  import { definePage } from 'vue-router/auto'
  import { onBeforeMount, ref, shallowRef } from 'vue'

  // Stores
  import { useHttpStore } from '@/stores/http'
  import { User } from '@/stores/auth'

  // Icons
  import { mdiMagnify } from '@mdi/js'

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