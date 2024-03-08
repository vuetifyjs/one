<template>
  <router-view />

  <SpeedInsights />
</template>

<script lang="ts" setup>
  import { inject } from '@vercel/analytics'
  import { SpeedInsights } from '@vercel/speed-insights/vue'

  inject()
</script>
