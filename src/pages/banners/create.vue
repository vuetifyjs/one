<template>
  <v-layout class="ma-4" full-height>
    <VoNotificationsBanner
      class="overflow-hidden"
      demo
      rounded
    />

    <v-main class="mt-4">
      <BannersForm
        :is-pristine="isPristine"
        prepend-icon="mdi-pencil-outline"
        title="Create Banner"
        @click:cancel="onClickCancel"
        @click:save="onClickSave"
      />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const banners = useBannersStore()
  const router = useRouter()

  const isPristine = computed(() => {
    return JSON.stringify(banners.record) === JSON.stringify(DEFAULT_BANNER)
  })

  onBeforeMount(() => {
    banners.record = structuredClone(DEFAULT_BANNER)
  })

  function onClickCancel () {
    banners.record = structuredClone(DEFAULT_BANNER)
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await banners.store(data)

    router.push({
      name: '/banners/[id]',
      params: { id: res.id },
    })
  }
</script>
