<template>
  <VoFooter
    :image="settings.suit['footer']"
    app
  />
</template>

<script lang="ts" setup>
  // Stores
  import { useSettingsStore } from '@/stores/settings'

  const settings = useSettingsStore()
</script>
