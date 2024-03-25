<template>
  <VoPromotionsCard
    v-if="promotion || !promotions.hasLoaded"
    class="mb-4"
    :color="promotion?.metadata.color ?? 'surface'"
    height="60"
    :href="promotion?.metadata.url"
    :image="image"
    max-width="720"
    :prepend-avatar="logo"
    :title="promotion?.metadata.short_text"
    width="100%"
  >
    <v-skeleton-loader
      v-if="!promotions.hasLoaded"
      class="flex-1-0 overflow-hidden"
      color="transparent"
      height="60"
      loading
      type="image"
    />

    <template v-if="promotion" #prepend>
      <v-avatar class="my-n4 me-4" size="36" />
    </template>

    <template v-if="promotion" #image>
      <v-img position="right" />
    </template>
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
  const user = useUserStore()

  const promotion = computed(() => {
    if (promotions.record) return promotions.record

    if (user.disableAds) return undefined

    if (props.slug) return promotions.all.find(p => p.slug === props.slug)

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
</script>
