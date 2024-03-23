<template>
  <v-container>
    <BannersForm
      :is-pristine="isPristine"
      prepend-icon="mdi-pencil-outline"
      title="Edit Banner"
      @click:cancel="onClickCancel"
      @click:save="onClickSave"
    />
  </v-container>
</template>

<script lang="ts" setup>
  // Stores
  import { Banner } from '@/stores/banners'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const original = ref<Banner>()
  const banners = useBannersStore()
  const params = useParams<{ id: string }>()

  const isPristine = computed(() => {
    return JSON.stringify(banners.record) === JSON.stringify(original.value)
  })

  onMounted(async () => {
    const res = await banners.show(params.value.id)

    original.value = structuredClone(res)
  })

  onBeforeRouteLeave(() => {
    banners.record = undefined
  })

  function onClickCancel () {
    banners.record = structuredClone(toRaw(original.value))
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await banners.update(original.value!.id, data)

    original.value = structuredClone(res)
  }
</script>
