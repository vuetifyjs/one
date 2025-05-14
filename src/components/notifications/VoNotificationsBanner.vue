<template>
  <v-app-bar
    v-if="banner"
    :color="banner.metadata.color"
    flat
    :height="height"
    :image="image"
    :location="demo ? 'bottom' : undefined"
    :model-value="hasPromotion"
    order="-1"
  >
    <v-list-item
      v-bind="link"
      :active="false"
      class="flex-grow-1 py-6"
      lines="two"
      @click="onClick"
    >
      <template #prepend>
        <v-avatar
          v-if="banner.metadata.images.logo"
          icon="$vuetify"
          :image="banner.metadata.images.logo.url"
          size="x-large"
          tile
        />
      </template>

      <v-list-item-title
        v-if="banner.metadata.text"
        class="text-subtitle-2 text-md-subtitle-1 font-weight-medium"
      >
        {{ banner.metadata.text }}
      </v-list-item-title>

      <v-list-item-subtitle v-if="banner.metadata.subtext">
        {{ banner.metadata.subtext }}
      </v-list-item-subtitle>

      <template #append>
        <v-hover v-if="mdAndUp && banner.metadata.link && banner.metadata.link_text">
          <template #default="{ isHovering, props: activatorProps }">
            <v-btn
              v-bind="{
                ...activatorProps,
                ...link
              }"
              :append-icon="`svg:${mdiOpenInNew}`"
              class="text-none me-2"
              :color="banner.metadata.link_color"
              :elevation="isHovering ? 8 : 0"
              :title="banner.metadata.link_text"
              variant="elevated"
              @click="onClick"
            >
              {{ banner.metadata.link_text }}
            </v-btn>

          </template>
        </v-hover>

        <v-btn
          v-if="banner.metadata.closable"
          class="ms-6 me-2"
          density="comfortable"
          icon="$clear"
          size="small"
          variant="plain"
          @click.prevent.stop="onClose"
        />
      </template>
    </v-list-item>
  </v-app-bar>
</template>

<script setup lang="ts">
  // Icons
  import { mdiOpenInNew } from '@mdi/js'

  // Types
  interface Props {
    demo?: boolean
  }

  const props = defineProps<Props>()

  const { mdAndUp } = useDisplay()
  const router = useRouter()
  const user = useUserStore()
  const banners = useBannersStore()

  const banner = computed(() => banners.banner)
  const height = computed(() => banner.value?.metadata.height || (banner.value?.metadata.subtext ? 88 : 48))
  const hasPromotion = computed(() => {
    if (props.demo) return true

    return !banner.value || !user.notifications.last.banner.includes(banner.value.slug)
  })

  function onClose () {
    if (props.demo) return
    if (!banner.value) return

    user.notifications.last.banner.push(banner.value.slug)
  }

  async function onClick (e: MouseEvent | KeyboardEvent) {
    if (!banner.value) return

    onClose()

    await nextTick()

    const metadata = banner.value?.metadata ?? { link: '' }

    if (!metadata.link.includes('?one=')) return

    e.preventDefault()
    e.stopPropagation()

    const one = metadata.link.split('?one=')[1]

    router.push({ query: { one } })
  }

  const link = computed(() => {
    const metadata = banner.value?.metadata ?? { link: '' }

    return {
      href: metadata.link.startsWith('http') ? metadata.link : undefined,
      target: metadata.link.startsWith('http') ? '_blank' : undefined,
      to: metadata.link.startsWith('http') ? undefined : metadata.link,
      ...banner.value?.metadata.attributes,
      onClick,
    }
  })

  const image = computed(() => {
    const bg = banner.value?.metadata.images.bg?.url
    if (!bg?.startsWith('https://cdn.cosmicjs.com/')) return bg
    const url = new URL(bg)
    url.host = 'imgix.cosmicjs.com'
    url.search = new URLSearchParams({
      auto: 'format,compress',
      q: '10',
      fit: 'crop',
      w: '4096',
      h: '256',
    }).toString()
    return url.toString()
  })
</script>

<style scoped>
.v-app-bar :deep(.v-toolbar__image)::after {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(calc(v-bind('banner?.metadata.bg_blur') * 1px));
  /* https://non-boring-gradients.netlify.app/
     15deg, easeOutQuad, rgba(0,0,0,0.65) to rgba(0,0,0,0) */
  background: linear-gradient(
    15deg,
    rgb(0% 0% 0% / 0.65) 0%,
    rgb(0% 0% 0% / 0.5712890625) 6.25%,
    rgb(0% 0% 0% / 0.49765625) 12.5%,
    rgb(0% 0% 0% / 0.4291015625) 18.75%,
    rgb(0% 0% 0% / 0.36562500000000003) 25%,
    rgb(0% 0% 0% / 0.3072265625) 31.25%,
    rgb(0% 0% 0% / 0.25390625) 37.5%,
    rgb(0% 0% 0% / 0.20566406250000002) 43.75%,
    rgb(0% 0% 0% / 0.16249999999999998) 50%,
    rgb(0% 0% 0% / 0.12441406249999998) 56.25%,
    rgb(0% 0% 0% / 0.09140625000000002) 62.5%,
    rgb(0% 0% 0% / 0.0634765625) 68.75%,
    rgb(0% 0% 0% / 0.04062500000000002) 75%,
    rgb(0% 0% 0% / 0.022851562499999978) 81.25%,
    rgb(0% 0% 0% / 0.010156249999999978) 87.5%,
    rgb(0% 0% 0% / 0.002539062500000022) 93.75%,
    rgb(0% 0% 0% / 0) 100%
  );
}
.v-list-item-subtitle {
  color: currentColor;
  opacity: var(--v-high-emphasis-opacity);
}
</style>
