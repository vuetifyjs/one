<template>
  <v-app-bar
    class="border-b"
    :image="settings.suit['app-bar']"
    name="vo-app-bar"
  >
    <template #prepend>
      <router-link class="ps-2" to="/">
        <v-img :src="image" width="128" />
      </router-link>

      <slot name="prepend-fixed" />

      <slot v-if="!isMobile" name="prepend" />
    </template>

    <template v-if="!isMobile && slots.title" #title>
      <slot name="title" />
    </template>

    <slot v-if="!isMobile" />

    <template v-if="!isMobile && slots.extension" #extension>
      <slot name="extension" />
    </template>

    <template #append>
      <slot name="append-fixed" />

      <template v-if="isMobile">
        <VoMobileMenu>
          <template v-for="(_, key) in slots" :key="key" #[key]>
            <slot :name="key" />
          </template>
        </VoMobileMenu>
      </template>

      <slot v-else name="append" />

      <v-divider
        v-if="'append' in slots || 'append-fixed' in slots"
        class="align-self-center h-100 mx-2 mx-sm-4"
        length="20"
        vertical
      />
      <VoAuthBtn />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    logo: string
  }

  const props = defineProps<Props>()
  const slots = defineSlots<{
    'default'?: () => any
    'prepend'?: () => any
    'title'?: () => any
    'extension'?: () => any
    'append'?: () => any

    'prepend-fixed'?: () => any
    'append-fixed'?: () => any
  }>()

  const theme = useTheme()

  const settings = useSettingsStore()
  const one = useOneStore()

  const isMobile = computed(() => one.mobileBreakpoint)
  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/${props.logo}-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
