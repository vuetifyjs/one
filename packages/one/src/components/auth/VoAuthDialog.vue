<template>
  <v-dialog
    v-model="auth.dialog"
    max-width="480"
    :persistent="auth.persistent"
  >
    <VoAuthCard />
  </v-dialog>
</template>

<script setup lang="ts">
  const auth = useAuthStore()
</script>
