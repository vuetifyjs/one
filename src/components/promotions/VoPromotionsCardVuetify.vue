<template>
  <VoPromotionsCard
    v-if="promotion || !promotions.hasLoaded"
    border
    caption="ads via vuetify"
    class="vo-promotions-card-vuetify pa-2"
    :href="promotion?.metadata?.url"
    width="360"
  >
    <div class="d-flex ga-4">
      <template v-if="!promotions.hasLoaded">
        <v-skeleton-loader
          class="flex-1-0 overflow-hidden"
          color="transparent"
          loading
          max-height="100"
          min-width="130"
          type="image"
        />

        <v-skeleton-loader
          class="flex-1-0 ms-n3 mt-n3"
          color="transparent"
          loading
          max-height="100"
          type="text@3"
        />
      </template>

      <template v-else-if="promotion">
        <v-img
          cover
          height="100"
          max-width="130"
          position="right"
          rounded="s"
          :src="promotion.metadata?.images.default?.url"
          width="100%"
        />

        <div class="d-flex align-start ga-4">
          <div class="text-caption on-surface-light">
            {{ promotion.metadata?.text }}
          </div>
        </div>
      </template>
    </div>
  </VoPromotionsCard>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    slug?: string
  }

  const props = defineProps<Props>()

  const auth = useAuthStore()
  const promotions = usePromotionsStore()
  const user = useUserStore()

  const promotion = computed(() => {
    if (auth.user && !user.one.ads.enabled && !user.one.ads.house) return undefined

    if (props.slug) return promotions.all.find(p => p.slug === props.slug)

    return promotions.random(!user.one.ads.enabled && user.one.ads.house ? promotions.discoverable : promotions.all)
  })
</script>
