<template>
  <v-container>
    <NotificationsForm
      :is-pristine="isPristine"
      prepend-icon="$edit"
      title="Edit Notification"
      @click:cancel="onClickCancel"
      @click:save="onClickSave"
    />
  </v-container>
</template>

<script lang="ts" setup>
  // Stores
  import type { Notification } from '@/stores/notifications'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const original = ref<Notification>()
  const notifications = useNotificationsStore()
  const params = useParams<{ id: string }>()

  const isPristine = computed(() => {
    return JSON.stringify(notifications.record) === JSON.stringify(original.value)
  })

  onMounted(async () => {
    const res = await notifications.show(params.value.id)

    original.value = structuredClone(res)
  })

  onBeforeRouteLeave(() => {
    notifications.record = undefined
  })

  function onClickCancel () {
    notifications.record = structuredClone(toRaw(original.value))
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await notifications.update(original.value!.id, data)

    original.value = structuredClone(res)
  }
</script>
