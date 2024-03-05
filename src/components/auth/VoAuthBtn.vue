<template>
  <VoBtn
    v-bind="{
      [`${lgAndUp ? 'append-' : ''}icon`]: !auth.user ? `svg:${mdiLogin}` : undefined,
    }"
    :color="one.isOpen || !auth.user ? 'primary' : 'surface-light'"
    :icon="auth.user"
    :rounded="mdAndDown"
    :variant="auth.user ? 'outlined' : 'flat'"
    class="vo-auth-btn"
    size="default"
    active
  >
    <span v-if="!auth.user">Login</span>

    <v-avatar
      v-if="auth.user"
      :image="user.avatar || auth.user.picture || ''"
    />

    <VoUserMenu />

    <template #loader>
      <v-skeleton-loader type="avatar" />
    </template>
  </VoBtn>
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

<style lang="sass" scoped>
  .vo-auth-btn
    :deep(.v-skeleton-loader__avatar)
      min-height: 40px
      height: 40px
      width: 40px
      max-height: 40px
      min-width: 40px
      max-width: 40px
</style>
