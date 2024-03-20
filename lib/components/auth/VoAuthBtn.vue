<template>
  <VoNotificationsTotalBadge :offset-y="auth.user ? 5 : 0">
    <VoBtn
      v-bind="{
        [`${lgAndUp ? 'append-' : ''}icon`]: !auth.user ? `svg:${mdiLogin}` : undefined,
      }"
      active
      class="vo-auth-btn"
      :color="color"
      :icon="auth.user || auth.isLoading"
      :loading="auth.isLoading"
      size="default"
      style="transition: .2s ease;"
      :variant="auth.user ? 'outlined' : 'flat'"
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
  // Icons
  import { mdiLogin } from '@mdi/js'

  defineProps({
    external: Boolean,
  })

  const auth = useAuthStore()
  const one = useOneStore()
  const user = useUserStore()

  const { lgAndUp } = useDisplay()

  const color = computed(() => {
    return one.isOpen || !auth.user
      ? user.colors.one === 'surface-light'
        ? 'primary'
        : user.colors.one
      : 'surface-light'
  })
</script>
