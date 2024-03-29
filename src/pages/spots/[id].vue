<template>
  <v-layout class="ma-4" full-height>
    <v-main>
      <SpotsForm
        :is-pristine="isPristine"
        prepend-icon="$edit"
        title="Edit Spot"
        @click:cancel="onClickCancel"
        @click:save="onClickSave"
      />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  // Stores
  import { Spot } from '@/stores/spots'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const original = ref<Spot>()
  const spots = useSpotsStore()
  const params = useParams<{ id: string }>()

  const isPristine = computed(() => {
    return JSON.stringify(spots.record) === JSON.stringify(original.value)
  })

  onMounted(async () => {
    const res = await spots.show(params.value.id)

    original.value = structuredClone(res)
  })

  onBeforeRouteLeave(() => {
    spots.record = undefined
  })

  function onClickCancel () {
    spots.record = structuredClone(toRaw(original.value))
  }

  async function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    const res = await spots.update(original.value!.id, data)

    original.value = structuredClone(res)
  }
</script>
