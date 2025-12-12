<template>
  <VoListItem
    link
    prepend-icon="$vuetify-outline"
    rounded="lg"
    title="Vuetify Ecosystem"
  >
    <template v-if="!user.one.ecosystem.seen" #append>
      <v-chip
        color="success"
        size="x-small"
        text="NEW"
        variant="flat"
      />
    </template>

    <v-dialog
      v-if="mobile"
      v-model="isOpen"
      activator="parent"
      max-width="320"
    >
      <VoEcosystemMenu />
    </v-dialog>

    <v-menu
      v-else
      v-model="isOpen"
      activator="parent"
      :close-on-content-click="false"
      :offset="[16, 0]"
      submenu
    >
      <VoEcosystemMenu />
    </v-menu>
  </VoListItem>
</template>

<script lang="ts" setup>
  import VoEcosystemMenu from './VoEcosystemMenu.vue'

  const user = useUserStore()
  const { mobile } = useDisplay()

  const isOpen = shallowRef(false)

  watch(isOpen, val => {
    if (val && !user.one.ecosystem.seen) {
      user.one.ecosystem.seen = true
    }
  })
</script>
