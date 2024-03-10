<template>
  <v-container>
    Dashboard
  </v-container>
</template>

<script lang="ts" setup>
  import { definePage } from 'vue-router/auto'

  definePage({
    meta: {
      requiresAuth: true,
    },
  })
</script>
