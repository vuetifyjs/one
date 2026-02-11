<template>
  <v-app-bar
    class="border-b"
    :image="settings.suit['app-bar']"
    name="vo-app-bar"
  >
    <template #prepend>
      <router-link class="ps-2 ps-md-5" to="/">
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
        <VoMobileMenu v-model="mobileMenu">
          <template #activator="menuProps">
            <slot name="menu-activator" v-bind="menuProps" />
          </template>

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
      <div class="pe-md-3" />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    logo: string
    responsive?: boolean
  }

  const props = defineProps<Props>()
  const mobileMenu = defineModel<boolean>('mobileMenu', { default: false })
  const slots = defineSlots<{
    'default'?: () => any
    'prepend'?: () => any
    'title'?: () => any
    'extension'?: () => any
    'append'?: () => any

    'prepend-fixed'?: () => any
    'append-fixed'?: () => any

    'menu-activator'?: (props: Record<string, any>) => any
  }>()

  const theme = useTheme()

  const settings = useSettingsStore()

  const { mobile } = useDisplay()

  const isMobile = computed(() => props.responsive == true && mobile.value)

  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/${props.logo}-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
