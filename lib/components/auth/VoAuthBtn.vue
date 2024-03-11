<template>
  <VoNotificationsTotalBadge :offset-y="auth.user ? 5 : 0">
    <VoBtn
      v-bind="{
        [`${lgAndUp ? 'append-' : ''}icon`]: !auth.user ? `svg:${mdiLogin}` : undefined,
      }"
      :color="one.isOpen ? color : 'surface-variant'"
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

  <VoAuthDialog />
</template>

<script lang="ts" setup>
  // Utilities
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useOneStore } from '@/stores/one'
  import { useUserStore } from '@/stores/user'

  // Icons
  import { mdiLogin } from '@mdi/js'

  defineProps({
    external: Boolean,
  })

  const auth = useAuthStore()
  const one = useOneStore()
  const user = useUserStore()

  const { lgAndUp, mdAndDown } = useDisplay()

  const color = computed(() => {
    return one.isOpen || !auth.user
      ? user.colors.one === 'surface-light'
        ? 'primary'
        : user.colors.one
      : 'surface-light'
  })
</script>
