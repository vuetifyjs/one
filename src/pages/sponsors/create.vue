<template>
  <v-container>
    <SponsorsForm
      :is-pristine="isPristine"
      prepend-icon="mdi-pencil-outline"
      title="Create Sponsor"
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

  const sponsors = useSponsorsStore()
  const router = useRouter()

  const isPristine = computed(() => {
    return JSON.stringify(sponsors.record) === JSON.stringify(DEFAULT_SPONSOR)
  })

  onBeforeMount(() => {
    sponsors.record = structuredClone(DEFAULT_SPONSOR)
  })

  function onClickCancel () {
    sponsors.record = structuredClone(DEFAULT_SPONSOR)
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await sponsors.store(data)

    router.push({
      name: '/sponsors/[id]',
      params: { id: res.id },
    })
  }
</script>
