<template>
  <VoNotificationsTotalBadge :offset-y="auth.user ? 5 : 0">
    <VoBtn
      v-bind="{
        [`${lgAndUp ? 'append-' : ''}icon`]: !auth.user ? `svg:${mdiLogin}` : undefined,
      }"
      :color="one.isOpen || !auth.user ? 'primary' : 'surface-light'"
      :icon="auth.user || auth.isLoading"
      :loading="auth.isLoading"
      :rounded="mdAndDown"
      :variant="auth.user ? 'outlined' : 'flat'"
      class="vo-auth-btn"
      size="default"
      style="transition: .2s ease;"
      active
    >
      <span v-if="!auth.user">Login</span>

      <v-avatar
        v-if="auth.user"
        :image="user.avatar || auth.user.picture || ''"
      />

      <VoUserMenu />
    </VoBtn>
  </VoNotificationsTotalBadge>
</template>

<script lang="ts" setup>
  // Utilities
  import { useDisplay } from 'vuetify'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useOneStore } from '@/store/one'
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiLogin } from '@mdi/js'

  defineProps({
    external: Boolean,
  })

  const auth = useAuthStore()
  const one = useOneStore()
  const user = useUserStore()

  const { lgAndUp, mdAndDown } = useDisplay()
</script>
