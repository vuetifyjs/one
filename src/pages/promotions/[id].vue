<template>
  <v-layout class="ma-4" full-height>
    <v-main>
      <PromotionsForm
        :is-pristine="isPristine"
        prepend-icon="$edit"
        title="Edit Promotion"
        @click:cancel="onClickCancel"
        @click:save="onClickSave"
      />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  // Stores
  import type { Promotion } from '@/stores/promotions'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const original = ref<Promotion>()
  const promotions = usePromotionsStore()
  const params = useParams<{ id: string }>()

  const isPristine = computed(() => {
    return JSON.stringify(promotions.record) === JSON.stringify(original.value)
  })

  onMounted(async () => {
    const res = await promotions.show(params.value.id)

    original.value = structuredClone(res)
  })

  onBeforeRouteLeave(() => {
    promotions.record = undefined
  })

  function onClickCancel () {
    promotions.record = structuredClone(toRaw(original.value))
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await promotions.update(original.value!.id, data)

    original.value = structuredClone(res)
  }
</script>
