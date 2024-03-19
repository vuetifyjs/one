<template>
  <VoSocialFooter
    app
    :image="settings.suit['footer']"
  />
</template>

<script lang="ts" setup>
  // Stores
  import { useSettingsStore } from '@/stores/settings'

  const settings = useSettingsStore()
</script>
