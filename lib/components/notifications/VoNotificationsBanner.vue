<template>
  <v-app-bar
    v-if="banner"
    :color="banner.metadata.color"
    flat
    :height="height"
    :image="banner.metadata.images.bg?.url"
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
          :disabled="demo"
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
  // Composables
  import { useDisplay } from 'vuetify'
  import { useRouter } from 'vue-router'

  // Utilities
  import { computed, nextTick } from 'vue'

  // Stores
  import { useBannersStore } from '@/stores/banners'
  import { useUserStore } from '@/stores/user'

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
    if (!banner.value) return

    user.notifications.last.banner.push(banner.value.slug)
  }

  async function onClick (e: MouseEvent | KeyboardEvent) {
    if (!banner.value) return

    onClose()

    await nextTick()

    const metadata = banner.value?.metadata ?? { link: '' }

    if (metadata.link.indexOf('?one=') === -1) return

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
      to: !metadata.link.startsWith('http') ? metadata.link : undefined,
      ...banner.value?.metadata.attributes,
      onClick,
    }
  })
</script>@/stores/banners@/stores/user
