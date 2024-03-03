<template>
  <v-expand-transition>
    <div v-if="user.quickbar">
      <div class="d-flex align-center justify-center pa-1 ga-2">
        <v-btn
          class="text-caption"
          color="primary"
          density="comfortable"
          href="https://play.vuetifyjs.com"
          icon="$vuetify-play"
          target="_blank"
        />

        <v-btn
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
    </div>
  </v-expand-transition>
</template>

<script lang="ts" setup>
  // Stores
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiBug, mdiTrashCan } from '@mdi/js'

  const user = useUserStore()
</script>
