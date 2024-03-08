<template>
  <AppDrawer />

  <v-container>
    Dashboard
  </v-container>
</template>

<script lang="ts" setup>
  definePage({
    meta: {
      requiresAuth: true,
    },
  })
</script>
