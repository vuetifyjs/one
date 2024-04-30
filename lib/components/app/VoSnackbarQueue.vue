<template>
  <VSnackbarQueue
    v-model="snackbar.queue"
    closable
    location="bottom end"
  />
</template>

<script lang="ts" setup>
  const snackbar = useQueueStore()
</script>
