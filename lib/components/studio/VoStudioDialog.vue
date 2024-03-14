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
          src="https://github.com/vuetifyjs/vuetify/assets/9064066/692a6daf-0999-4fa1-a8c8-b1653cf55ca8"
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
                  :order="i % 2 === 0 ? 0 : 1"
                  cols="6"
                  offset="1"
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
                  :offset="i % 2 === 0 ? 0 : 1"
                  :order="i % 2 === 0 ? 1 : 0"
                  cols="4"
                >
                  <v-img
                    :src="item.image"
                    height="180"
                    rounded="lg"
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
                <v-avatar image="https://vuetifyjs.b-cdn.net/docs/images/avatars/one.png" size="64" />
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

  const items = [
    {
      title: 'Customize',
      subtitle: 'Customize your Vuetify theme, components, and more with the Vuetify Studio.',
      text: 'Vuetify Studio is a premium tool that allows you to customize your Vuetify theme, components, and more. Unlock Vuetify One status to gain access to the Vuetify Studio Alpha.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/816239b3-caf5-4108-b3e7-f5b453a430f1',
    },
    {
      title: 'Configure',
      subtitle: 'Configure every aspect of your application from a single interface.',
      text: 'Vuetify Studio allows you to configure every single property of your application, including global values, and more.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/0a082a25-7470-4d95-82e4-ed1ff44e9541',
    },
    {
      title: 'Export',
      subtitle: 'Export your configuration and easily implement your options.',
      text: 'Vuetify Studio allows you to export your options to a Vuetify configuration file for easy integration into your application.',
      image: 'https://github.com/vuetifyjs/vuetify/assets/9064066/1549d67d-f5eb-444d-b817-d0447b30bf0a',
    },
  ]

  watch(query, async () => {
    if (query.value.one !== 'studio') return

    await nextTick()

    dialog.value = true
  }, { immediate: true })

  function onClickSubscribe () {
    dialog.value = false

    router.push({ query: { one: 'subscribe' } })
  }
</script>
