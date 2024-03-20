<template>
  <v-container>
    <NotificationsForm
      :is-pristine="isPristine"
      prepend-icon="mdi-pencil-outline"
      title="Create Notification"
      @click:cancel="onClickCancel"
      @click:save="onClickSave"
    />
  </v-container>
</template>

<script lang="ts" setup>
  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const router = useRouter()
  const notifications = useNotificationsStore()

  const isPristine = computed(() => {
    return JSON.stringify(notifications.record) === JSON.stringify(DEFAULT_NOTIFICATION)
  })

  onBeforeMount(async () => {
    notifications.record = structuredClone(DEFAULT_NOTIFICATION)
  })

  function onClickCancel () {
    notifications.record = structuredClone(toRaw(DEFAULT_NOTIFICATION))
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await notifications.store(data)

    router.push({
      name: '/notifications/[id]',
      params: { id: res.id },
    })
  }
</script>
