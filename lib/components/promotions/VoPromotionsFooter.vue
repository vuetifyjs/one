<template>
  <VoFooter
    :image="image"
    style="transform: translateY(0); /* no idea why this is needed */"
  >
    <a
      class="d-flex text-decoration-none py-2 px-4 ms-n4 flex-1-0 me-n4 text-high-emphasis position-relative"
      :href="promotion?.metadata.url"
      rel="noopener noreferrer"
      target="_blank"
    >
      <v-avatar
        class="me-4"
        :image="logo"
        size="24"
      />

      <div class="text-white">
        {{ promotion?.metadata.text }}
      </div>

      <v-chip
        v-if="promotion?.metadata.advertisement"
        class="ms-auto me-n4 align-self-end mb-n2 py-1 ps-3"
        rounded="0 ts-lg"
        size="x-small"
        text="SPONSORED"
        variant="flat"
      />
    </a>
  </VoFooter>
</template>

<script lang="ts" setup>
  // Composables
  import { useTheme } from 'vuetify'

  // Utilities
  import { computed } from 'vue'

  // Stores
  import { usePromotionsStore } from '@/stores/promotions'

  // Types
  interface Props {
    slug?: string
  }

  const props = defineProps<Props>()

  const promotions = usePromotionsStore()
  const theme = useTheme()

  const promotion = computed(() => {
    if (props.slug) {
      const found = promotions.show(props.slug)

      if (found) return found
    }

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
