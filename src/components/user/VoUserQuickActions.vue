<template>
  <div
    v-if="user.quickbar"
    class="d-flex align-center justify-center pa-1 ga-2"
  >
    <v-btn
      v-if="auth.user"
      class="text-caption"
      color="primary"
      density="comfortable"
      href="https://play.vuetifyjs.com"
      icon="$vuetify-play"
      target="_blank"
    />

    <v-btn
      v-if="auth.user"
      :icon="`svg:${mdiTrashCan}`"
      class="text-caption"
      color="primary"
      density="comfortable"
      href="https://bin.vuetifyjs.com"
      target="_blank"
    />

    <v-btn
      :icon="`svg:${mdiBug}`"
      class="text-caption"
      color="primary"
      density="comfortable"
      href="https://issues.vuetifyjs.com"
      target="_blank"
    />
  </div>
</template>

<script lang="ts" setup>
  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiBug, mdiTrashCan } from '@mdi/js'

  const auth = useAuthStore()
  const user = useUserStore()
</script>
