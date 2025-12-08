<template>
  <v-expand-transition>
    <div v-if="user.one.quicklinks">
      <div class="d-flex align-center justify-center py-2 px-6 ga-1 flex-wrap">
        <v-btn
          v-for="action in actions"
          :key="action.name"
          class="text-caption"
          :color="user.one.colors.primary"
          density="comfortable"
          flat
          :href="action.href"
          :icon="action.icon"
          target="_blank"
        >
          <v-icon />

          <v-tooltip
            activator="parent"
            location="top"
            :text="action.name"
          />
        </v-btn>
      </div>
    </div>
  </v-expand-transition>
</template>

<script lang="ts" setup>
  const user = useUserStore()

  const actions = [
    {
      name: 'Vuetify Play',
      href: 'https://play.vuetifyjs.com',
      icon: '$vuetify-play',
    },
    {
      name: 'Vuetify Bin',
      href: 'https://bin.vuetifyjs.com',
      icon: '$vuetify-bin',
    },
    {
      name: 'Vuetify Studio',
      href: 'https://studio.vuetifyjs.com',
      icon: '$vuetify-studio',
    },
    {
      name: 'Vuetify Snips',
      href: 'https://snips.vuetifyjs.com',
      icon: '$vuetify-snips',
    },
    {
      name: 'Vuetify Link',
      href: 'https://link.vuetifyjs.com',
      icon: '$vuetify-link',
    },
    {
      name: 'Vuetify Issues',
      href: 'https://issues.vuetifyjs.com',
      icon: '$vuetify-issues',
    },
    {
      name: 'Vuetify Store',
      href: 'https://store.vuetifyjs.com',
      icon: '$vuetify-store',
    },
  ]
</script>
