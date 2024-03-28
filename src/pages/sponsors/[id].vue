<template>
  <v-container>
    <SponsorsForm
      :is-pristine="isPristine"
      prepend-icon="$edit"
      title="Edit Sponsor"
      @click:cancel="onClickCancel"
      @click:save="onClickSave"
    />
  </v-container>
</template>

<script lang="ts" setup>
  // Types
  import type { Sponsor } from '@/stores/sponsors'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const original = ref<Sponsor>()
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
