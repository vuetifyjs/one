<template>
  <v-list
    class="py-0"
    height="100%"
    lines="three"
  >
    <div v-if="!items.length" class="pt-16">
      <v-empty-state

        icon="$vuetify"
        size="256"
      >
        <template #media>
          <v-icon color="medium-emphasis" />
        </template>

        <template #title>
          <div class="text-medium-emphasis">
            All caught up
          </div>
        </template>
      </v-empty-state>
    </div>

    <div v-else class="pa-5">
      <template
        v-for="banner in items"
        :key="banner.slug"
      >
        <div class="mb-4">
          <v-card
            :color="banner.metadata.color"
            flat
            :image="banner.metadata.images.bg?.url"
            rounded="b-0"
            :title="banner.title"
          >
            <template #prepend>
              <v-avatar :image="banner.metadata.images.logo?.url" />
            </template>

            <template #image>
              <v-img position="right" />
            </template>
          </v-card>

          <v-hover>
            <template #default="{ props:activatorProps, isHovering }">
              <v-sheet
                v-bind="activatorProps"
                border
                class="px-8 pt-2 pb-4 position-relative"
                rounded="b"
              >
                <v-tooltip
                  v-if="banner.metadata.site.some(s => site.id.includes(s))"
                  location="bottom"
                  :text="isRead(banner.slug) ? 'Mark as unread' : 'Mark as read'"
                >
                  <template #activator="{ props: tooltipActivatorProps }">
                    <v-fade-transition hide-on-leave>
                      <v-btn
                        v-show="isHovering || display.mobile.value"
                        v-bind="tooltipActivatorProps"
                        class="ms-auto float-right"
                        :icon="`svg:${!isRead(banner.slug) ? mdiEmailOpenOutline : mdiEmailVariant}`"
                        mdi-email-variant
                        size="small"
                        variant="text"
                        @click="onClick(banner)"
                      />
                    </v-fade-transition>
                  </template>
                </v-tooltip>

                <div class="text-subtitle-1 font-weight-bold">
                  {{ banner.metadata.text }}
                </div>

                <div class="text-caption font-weight-bold text-medium-emphasis">
                  {{ date.format(banner.created_at, 'fullDateWithWeekday') }}
                </div>

                <div class="text-disabled text-caption mt-2 mb-3">
                  {{ banner.metadata.subtext }}
                </div>

                <v-chip
                  v-bind="{
                    ...{
                      href: banner.metadata.link.startsWith('http') ? banner.metadata.link : undefined,
                      target: banner.metadata.link.startsWith('http') ? '_blank' : undefined,
                      to: !banner.metadata.link.startsWith('http') ? banner.metadata.link : undefined,
                    }
                  }"
                  :append-icon="`svg:${mdiOpenInNew}`"
                  border
                  label
                  size="small"
                  :text="banner.metadata.link_text"
                  variant="text"
                >
                  <template #append>
                    <v-icon size="12" />
                  </template>
                </v-chip>
              </v-sheet>
            </template>
          </v-hover>
        </div>
      </template>
    </div>
  </v-list>
</template>

<script setup lang="ts">
  // Icons
  import { mdiEmailOpenOutline, mdiEmailVariant, mdiOpenInNew } from '@mdi/js'

  // Types
  import type { VOneBanner } from '@/stores/banners'

  interface Props {
    items: VOneBanner[]
  }

  const date = useDate()
  const display = useDisplay()

  const user = useUserStore()
  const site = useSiteStore()

  defineProps<Props>()

  function isRead (slug: string) {
    return user.notifications.last.banner.includes(slug)
  }

  function onClick (banner: VOneBanner) {
    if (!isRead(banner.slug)) {
      user.notifications.last.banner.push(banner.slug)
    } else {
      user.notifications.last.banner = user.notifications.last.banner.filter(slug => slug !== banner.slug)
    }
  }
</script>
