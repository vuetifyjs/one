<template>
  <v-layout class="ma-4" full-height>
    <v-main>
      <SpotsForm
        :is-pristine="isPristine"
        prepend-icon="mdi-pencil-outline"
        title="Create Spot"
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

  const spots = useSpotsStore()
  const router = useRouter()

  const isPristine = computed(() => {
    return JSON.stringify(spots.record) === JSON.stringify(DEFAULT_SPOT)
  })

  onBeforeMount(() => {
    spots.record = structuredClone(DEFAULT_SPOT)
  })

  function onClickCancel () {
    spots.record = structuredClone(DEFAULT_SPOT)
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await spots.store(data)

    router.push({
      name: '/spots/[id]',
      params: { id: res.id },
    })
  }
</script>
