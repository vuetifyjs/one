<template>
  <v-menu
    v-model="one.isOpen"
    :close-on-click="false"
    :close-on-content-click="false"
    activator="parent"
    location="bottom end"
    eager
  >
    <v-card
      rounded="lg"
      width="280"
      border
    >
      <VoUserColors />

      <div class="text-center mt-n9 mb-4">
        <VoUserAvatar />

        <VoUserQuickActions />
      </div>

      <v-divider />

      <VoUserList />

      <v-divider />

      <VoAuthListItem />
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
  // Stores
  import { useOneStore } from '@/store/one'

  const one = useOneStore()
</script>
