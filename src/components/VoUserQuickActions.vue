<template>

  <div class="d-flex align-center justify-center pa-4 ga-2">
    <v-btn
      density="comfortable"
      :icon="`svg:${mdiCogOutline}`"
      color="primary"
      class="text-caption"
    />

    <v-btn
      v-if="auth.user"
      density="comfortable"
      :icon="`svg:${mdiCreditCardOutline}`"
      color="primary"
      class="text-caption"
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
