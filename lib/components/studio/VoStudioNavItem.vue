<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="studio"
    title="Vuetify Studio"
  >
    <template #append>
      <v-chip label size="x-small">COMING SOON</v-chip>
    </template>

    <VoStudioDialog v-model="dialog" :prepend-icon="studio" />
  </VoListItem>
</template>

<script lang="ts" setup>
  const dialog = shallowRef(false)

  const studio = [
    ['M12.435 14.3194L12 21L6.87046 12.2799L12.435 14.3194Z', 1],
    ['M22 4L12.435 14.3194L6.87046 12.2799L9.26479 7.61064L12.435 14.3194L12 21L22 4Z', 0.5],
    ['M12.435 14.3194L22 4L9.26479 7.61064L12.435 14.3194Z', 1],
    ['M2 4L6.87046 12.2799L9.26479 7.61064L2 4Z', 1],
  ]
</script>
