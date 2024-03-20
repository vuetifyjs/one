<template>
  <VoSocialFooter
    app
    :image="settings.suit['footer']"
  />
</template>

<script lang="ts" setup>
  const settings = useSettingsStore()
</script>
