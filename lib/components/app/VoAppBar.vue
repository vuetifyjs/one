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

      <slot name="prepend" />
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <slot />

    <template v-if="$slots.extension" #extension>
      <slot name="extension" />
    </template>

    <template #append>
      <slot name="append" />

      <v-divider
        v-if="$slots.append"
        class="mx-4 align-self-center h-100"
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

  const theme = useTheme()

  const settings = useSettingsStore()

  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/${props.logo}-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
