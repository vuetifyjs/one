<template>
  <div class="d-flex align-center justify-center pa-4 ga-2">
    <v-btn
      :icon="`svg:${mdiCogOutline}`"
      class="text-caption"
      color="primary"
      density="comfortable"
    />

    <v-btn
      v-if="auth.user"
      :icon="`svg:${mdiCreditCardOutline}`"
      class="text-caption"
      color="primary"
      density="comfortable"
    />
  </div>
</template>

<script lang="ts" setup>
  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiCogOutline, mdiCreditCardOutline } from '@mdi/js'

  const auth = useAuthStore()
</script>
