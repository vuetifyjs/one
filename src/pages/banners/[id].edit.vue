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
        prepend-icon="$edit"
        title="Edit Banner"
        @click:cancel="onClickCancel"
        @click:save="onClickSave"
      />
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  // Utilities
  import { computed, onMounted, ref, toRaw } from 'vue'
  import { definePage, onBeforeRouteLeave } from 'vue-router/auto'
  import { useParams } from '@/composables/route'

  import { Banner, useBannersStore } from '@/stores/banners'

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
    const res = await banners.edit(params.value.id)

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

    const res = await banners.save(original.value!.id, data)

    original.value = structuredClone(res)
  }
</script>
