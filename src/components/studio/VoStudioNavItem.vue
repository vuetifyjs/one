<template>
  <VoListItem
    :active="dialog"
    href="https://studio.vuetifyjs.com/"
    link
    prepend-icon="$vuetify-studio"
    target="_blank"
    title="Vuetify Studio"
  >
    <template #append>
      <v-chip color="amber-darken-1" label size="x-small" variant="outlined">Closed Alpha</v-chip>
    </template>

    <!-- <VoStudioDialog v-model="dialog" :prepend-icon="studio" /> -->
  </VoListItem>
</template>

<script lang="ts" setup>
  const dialog = shallowRef(false)
</script>
