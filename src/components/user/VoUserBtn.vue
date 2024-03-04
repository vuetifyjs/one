<template>
  <v-btn
    :loading="auth.isLoading"
    class="vo-user-btn"
    icon
  >
    <v-menu
      :close-on-click="false"
      :close-on-content-click="false"
      :disabled="!auth.user || auth.isLoading"
      activator="parent"
      location="bottom end"
    >
      <VoUserMenu />
    </v-menu>

    <v-avatar v-if="auth.user" :image="user.avatar || auth.user.picture || ''" />

    <template #loader>
      <v-skeleton-loader type="avatar" />
    </template>
  </v-btn>
</template>

<script setup lang="ts">
  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const user = useUserStore()
</script>

<style lang="sass" scoped>
  .vo-user-btn
    :deep(.v-skeleton-loader__avatar)
      min-height: 40px
      height: 40px
      width: 40px
      max-height: 40px
      min-width: 40px
      max-width: 40px
</style>
