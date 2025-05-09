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
      <!-- Mobile menu for smaller screens -->
      <template v-if="isMobile">
        <VoMobileMenu>
          <template v-for="(_, key) in slots" :key="key" #[key]>
            <slot :name="key" v-bind="exposed" />
          </template>
        </VoMobileMenu>
      </template>

      <!-- Desktop append slot -->
      <slot v-else name="append" v-bind="exposed" />

      <v-divider
        v-if="slots.append"
        class="align-self-center h-100 mx-2 mx-sm-4"
        length="20"
        vertical
      />

      <!-- Leads to one dropdown dialog -->
      <VoAuthBtn />
    </template>
  </v-app-bar>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    logo: string;
  }
  interface ScopedSlotsProps {
    isMobile?: boolean;
  }

  const props = defineProps<Props>();
  const slots = defineSlots<{
    default?(props: ScopedSlotsProps): any;
    prepend?(props: ScopedSlotsProps): any;
    title?(props: ScopedSlotsProps): any;
    extension?(props: ScopedSlotsProps): any;
    append?(props: ScopedSlotsProps): any;
  }>();

  const theme = useTheme();
  const display = useDisplay();

  const settings = useSettingsStore();

  const isMobile = computed(() => display.mdAndDown.value);
  const exposed = computed(() => ({ isMobile: isMobile.value }));
  const image = computed(() => {
    return `https://cdn.vuetifyjs.com/docs/images/one/logos/${props.logo}-logo-${theme.current.value.dark ? 'dark' : 'light'}.png`
  })
</script>
