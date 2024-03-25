<template>
  <v-layout full-height>
    <v-main>
      <!-- <SpotsForm
        :is-pristine="isPristine"
        prepend-icon="$edit"
        title="Edit Spot"
        @click:cancel="onClickCancel"
        @click:save="onClickSave"
      /> -->
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

  const original = ref<Spot>()
  const sponsors = useSponsorsStore()
  const params = useParams<{ id: string }>()

  const isPristine = computed(() => {
    return JSON.stringify(sponsors.record) === JSON.stringify(original.value)
  })

  onMounted(async () => {
    const res = await sponsors.show(params.value.id)

    original.value = structuredClone(res)
  })

  onBeforeRouteLeave(() => {
    sponsors.record = undefined
  })

  function onClickCancel () {
    sponsors.record = structuredClone(toRaw(original.value))
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await sponsors.update(original.value!.id, data)

    original.value = structuredClone(res)
  }
</script>
