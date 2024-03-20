<template>
  <VoPromotionsCard
    height="60"
    :href="promotion?.metadata.url"
    :image="image"
    max-width="720"
    :prepend-avatar="logo"
    :title="promotion?.metadata.short_text"
    width="100%"
  >
    <template v-if="promotion" #prepend>
      <v-avatar class="my-n4 me-4" size="36" />
    </template>

    <template v-if="promotion" #image>
      <v-img position="right" />
    </template>

    <v-skeleton-loader
      v-if="!promotion"
      class="flex-1-0 overflow-hidden"
      color="transparent"
      height="60"
      loading
      type="image"
    />
  </VoPromotionsCard>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    slug?: string
  }

  const props = defineProps<Props>()

  const promotions = usePromotionsStore()
  const theme = useTheme()

  const promotion = computed(() => {
    if (promotions.record) return promotions.record

    return promotions.random(promotions.all)
  })

  const logo = computed(() => {
    const target = theme.current.value.dark ? 'logodark' : 'logolight'

    return promotion.value?.metadata.images[target]?.url
  })

  const image = computed(() => {
    const target = theme.current.value.dark ? 'bgdark' : 'bglight'

    return promotion.value?.metadata.images[target]?.url
  })

  onBeforeMount(async () => {
    if (!props.slug) return

    await promotions.show(props.slug)
  })
</script>
