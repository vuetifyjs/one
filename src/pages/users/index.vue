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
            @update:model-value="onUpdateUser($event, item)"
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

        <template #item.actions="{ item }">
          <v-icon-btn
            icon="mdi-account-edit"
            size="small"
            @click="onClickUser(item)"
            @mouseenter="onMouseenter($event)"
          />
        </template>
      </v-data-table>
    </VoCard>
  </v-container>

  <VoDialog
    v-model="dialog"
    :activator="activator"
    height="auto"
    max-width="600"
    prepend-icon="mdi-account-edit"
    title="Edit User"
    @after-leave="editing = null"
  >
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Name"
            :model-value="editing?.name"
            readonly
          >
            <template #prepend-inner>
              <v-avatar color="surface-light" :image="editing?.picture" size="x-small" />
            </template>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="8">
          <v-text-field
            append-inner-icon="mdi-content-copy"
            label="ID"
            :model-value="editing?.id"
            readonly
            @click:append-inner="onClickCopy(editing?.id)"
          />
        </v-col>

        <v-col cols="12">
          <v-select
            chips
            item-title="platform"
            item-value="id"
            label="Sponsorships"
            menu-icon=""
            :model-value="editing?.sponsorships"
            readonly
          >
            <template #chip="{ props: chipProps, item }">
              <v-chip
                v-bind="chipProps"
                :color="item.raw.isActive ? 'success' : 'error'"
                :prepend-icon="item.raw.isActive ? '$success' : '$error'"
              >
                <span class="text-capitalize">{{ item.title }}</span>
                &nbsp;
                <span class="text-medium-emphasis">(${{ item.raw.amount / 100 }}/{{ item.raw.interval }})</span>
              </v-chip>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12">
          <v-textarea label="Settings" :model-value="editing?.settings" readonly />
        </v-col>

        <v-col cols="12">
          <v-switch label="Admin" :model-value="editing?.isAdmin" readonly />
        </v-col>
      </v-row>
    </v-container>

    <template #actions>
      <v-spacer />

      <v-btn text="Close" @click="dialog = false" />
    </template>
  </VoDialog>
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

  const activator = ref()
  const dialog = shallowRef(false)
  const editing = ref<User | null>(null)
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
    {
      title: 'Actions',
      value: 'actions',
      sortable: false,
      align: 'end',
    },
  ] as const

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

  function onMouseenter (e: MouseEvent) {
    activator.value = e.currentTarget
  }

  function onClickUser (item: User) {
    editing.value = toRaw(item)
  }

  function onClickCopy (id: string | undefined) {
    if (id) navigator.clipboard.writeText(id)
  }

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
