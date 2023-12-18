<template>
  <v-footer
    id="vo-footer"
    theme="dark"
    height="40"
  >
    <a
      class="d-inline-block me-2 text-decoration-none text-primary"
      href="https://vuetifyjs.com/"
      target="_blank"
      title="Vuetify Documentation"
      rel="noopener noreferrer"
    >
      <v-img
        alt="Vuetify logo"
        src="https://cdn.vuetifyjs.com/docs/images/logos/v.svg"
        width="32"
      />
    </a>

    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      <v-icon size="18">
        {{ item.icon }}
      </v-icon>
    </a>

    <div
      class="text-caption"
      style="position: absolute; right: 16px;"
    >
      &copy; 2016-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">Vuetify, LLC</span>
    </div>
  </v-footer>
</template>

<script setup lang="ts">
  import {
    mdiDiscord,
    mdiGithub,
    mdiReddit,
    mdiShieldStarOutline,
  } from '@mdi/js'

  const items = [
    {
      title: 'Vuetify Support',
      icon: `svg:${mdiShieldStarOutline}`,
      href: 'https://support.vuetifyjs.com/',
    },
    {
      title: 'Vuetify X',
      icon: `svg:M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z`,
      href: 'https://x.com/vuetifyjs',
    },
    {
      title: 'Vuetify GitHub',
      icon: `svg:${mdiGithub}`,
      href: 'https://github.com/vuetifyjs/vuetify',
    },
    {
      title: 'Vuetify Discord',
      icon: `svg:${mdiDiscord}`,
      href: 'https://community.vuetifyjs.com/',
    },
    {
      title: 'Vuetify Reddit',
      icon: `svg:${mdiReddit}`,
      href: 'https://reddit.com/r/vuetifyjs',
    },
  ]
</script>

<style lang="sass">
  .social-link svg
    color: rgba(25, 118, 210, .32)
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
