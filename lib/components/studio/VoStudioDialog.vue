<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="prependIcon"
    title="Vuetify Studio"
  >
    <v-layout>
      <v-main scrollable>
        <v-img
          content-class="d-flex align-center justify-center flex-column"
          gradient="to top right, rgba(var(--v-theme-primary),.8), rgba(0,0,0,.9)"
          height="350"
          max-height="350"
          position="top"
          src="https://cdn.vuetifyjs.com/docs/images/one/studio/hero.png"
          cover
        >
          <v-card
            class="text-center pa-2"
            color="surface-variant"
            flat
          >
            <template #text>
              <v-icon :icon="prependIcon" color="accent" size="80" />

              <h2 class="text-h4">
                Configuration Tooling
              </h2>

              <p class="text-subtitle-1 text-medium-emphasis">
                Coming soon to Vuetify One
              </p>
            </template>
          </v-card>
        </v-img>

        <template v-for="(item, i) in items" :key="i">
          <v-sheet
            :color="i % 2 === 0 ? 'surface-light' : 'surface-variant'"
            class="py-8"
          >
            <v-container>
              <v-row align="center">
                <v-col
                  :order="i % 2"
                  cols="12"
                  offset="0"
                  offset-sm="1"
                  sm="6"
                >
                  <strong class="text-uppercase text-info">
                    {{ item.title }}
                  </strong>

                  <p class="text-h6 mb-2">
                    {{ item.subtitle }}
                  </p>

                  <p class="text-body-2 text-medium-emphasis">
                    {{ item.text }}
                  </p>
                </v-col>

                <v-col
                  :offset-sm="i % 2"
                  cols="12"
                  offset="0"
                  sm="4"
                >
                  <v-img
                    :height="smAndUp ? 180 : undefined"
                    :src="item.image"
                    rounded="lg"
                    cover
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-sheet>
        </template>

        <v-sheet v-if="!auth.isSubscriber" class="text-center py-6">
          <v-container>
            <v-row justify="center">
              <v-col cols="6">
                <v-avatar image="https://cdn.vuetifyjs.com/docs/images/avatars/one.png" size="64" />
                <div>
                  Become a subscriber and be the first to gain access to the Vuetify Studio Alpha when it releases in April 2024.
                </div>

              </v-col>

              <v-col cols="12">
                <VoBtn
                  prepend-icon="$vuetify"
                  size="x-large"
                  text="Subscribe Today"
                  @click="onClickSubscribe"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-sheet>
      </v-main>

      <VoFooter app />
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  // Composables
  import { useDisplay } from 'vuetify'
  import { useRouter } from 'vue-router'

  // Utilities
  import { useQuery } from '@/composables/route'
  import { nextTick, watch } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useOneStore } from '@/stores/one'

  // Types
  interface Props {
    prependIcon?: any
  }

  defineProps<Props>()

  const dialog = defineModel('modelValue', { type: Boolean })

  const query = useQuery()
  const router = useRouter()
  const auth = useAuthStore()
  const one = useOneStore()
  const { smAndUp } = useDisplay()

  const items = [
    {
      title: 'Customize',
      subtitle: 'Customize your Vuetify theme, components, and more with the Vuetify Studio.',
      text: 'Vuetify Studio is a premium tool that allows you to customize your Vuetify theme, components, and more. Unlock Vuetify One status to gain access to the Vuetify Studio Alpha.',
      image: 'https://cdn.vuetifyjs.com/docs/images/one/studio/customize.png',
    },
    {
      title: 'Configure',
      subtitle: 'Configure every aspect of your application from a single interface.',
      text: 'Vuetify Studio allows you to configure every single property of your application, including global values, and more.',
      image: 'https://cdn.vuetifyjs.com/docs/images/one/studio/configure.png',
    },
    {
      title: 'Export',
      subtitle: 'Export your configuration and easily implement your options.',
      text: 'Vuetify Studio allows you to export your options to a Vuetify configuration file for easy integration into your application.',
      image: 'https://cdn.vuetifyjs.com/docs/images/one/studio/export.png',
    },
  ]

  watch(query, async () => {
    if (query.value.one !== 'studio') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })

  function onClickSubscribe () {
    dialog.value = false

    router.push({ query: { one: 'subscribe' } })
  }
</script>
