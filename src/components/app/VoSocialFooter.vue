<template>
  <VoFooter
    class="vo-footer"
    height="40"
    :image="settings.suit['footer']"
  >
    <template v-if="$slots.image" #image>
      <slot name="image" />
    </template>

    <a
      v-for="item in items"
      :key="item.title"
      class="d-inline-block mx-2 social-link"
      :href="item.href"
      rel="noopener noreferrer"
      target="_blank"
      :title="item.title"
    >
      <v-icon
        :icon="item.icon"
        :size="item.icon === '$vuetify' ? 24 : 16"
      />
    </a>

    <div
      class="text-caption text-disabled"
      style="position: absolute; right: 16px;"
    >
      &copy; 2016-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Vuetify, LLC</span>
    </div>
  </VoFooter>
</template>

<script setup lang="ts">
  // Icons
  import {
    mdiShieldStarOutline,
  } from '@mdi/js'

  const settings = useSettingsStore()

  const items = [
    {
      title: 'Vuetify Documentation',
      icon: `$vuetify`,
      href: 'https://vuetifyjs.com/',
    },
    {
      title: 'Vuetify Support',
      icon: `svg:${mdiShieldStarOutline}`,
      href: 'https://support.vuetifyjs.com/',
    },
    {
      title: 'Vuetify X',
      icon: '$x',
      href: 'https://x.com/vuetifyjs',
    },
    {
      title: 'Vuetify GitHub',
      icon: '$github',
      href: 'https://github.com/vuetifyjs/vuetify',
    },
    {
      title: 'Vuetify Discord',
      icon: '$discord',
      href: 'https://community.vuetifyjs.com/',
    },
    {
      title: 'Vuetify Reddit',
      icon: '$reddit',
      href: 'https://reddit.com/r/vuetifyjs',
    },
  ]
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgb(var(--v-theme-primary))
</style>
