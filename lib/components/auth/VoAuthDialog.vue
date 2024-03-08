<template>
  <v-dialog
    v-model="auth.dialog"
    max-width="480"
  >
    <VoAuthCard />
  </v-dialog>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/stores/auth'

  const auth = useAuthStore()
</script>
