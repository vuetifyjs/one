<template>
  <v-layout class="ma-4" full-height>
    <v-main>
      <PromotionsForm
        :is-pristine="isPristine"
        prepend-icon="mdi-pencil-outline"
        title="Create Promotion"
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

  const promotions = usePromotionsStore()
  const router = useRouter()

  const isPristine = computed(() => {
    return JSON.stringify(promotions.record) === JSON.stringify(DEFAULT_PROMOTION)
  })

  onBeforeMount(() => {
    promotions.record = structuredClone(DEFAULT_PROMOTION)
  })

  function onClickCancel () {
    promotions.record = structuredClone(DEFAULT_PROMOTION)
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await promotions.store(data)

    if (!res) return

    router.push({
      name: '/promotions/[id]',
      params: { id: res.id },
    })
  }
</script>
