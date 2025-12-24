<template>
  <v-badge
    :color="badgeColor"
    dot
    location="end top"
    :model-value="showBadge"
    :offset-x="auth.user ? -2 : 0"
    :offset-y="auth.user ? 5 : 0"
  >
    <VoBtn
      v-bind="{
        [`${lgAndUp ? 'append-' : ''}icon`]: !auth.user ? `svg:${mdiLogin}` : undefined,
      }"
      active
      :border="!!auth.user"
      class="vo-auth-btn"
      :color="color"
      :icon="auth.user || auth.isLoading || !smAndUp"
      :loading="auth.isLoading"
      :size="smAndUp ? 'default' : 'small'"
      style="transition: .2s ease;"
      :variant="!auth.user ? 'flat' : one.isOpen ? 'outlined' : 'text'"
      @click="onClick"
    >
      <v-avatar
        v-if="auth.user"
        :image="user.one.avatar || auth.user.picture || ''"
      />

      <template v-else>
        <span v-if="smAndUp">Login</span>
        <v-icon v-else :icon="`svg:${mdiLogin}`" />
      </template>

      <VoUserMenu v-if="auth.user" />
    </VoBtn>
  </v-badge>

  <VoAuthDialog />
  <VoTeamInvite />

  <VoSnackbarQueue />
</template>

<script lang="ts" setup>
  // Icons
  import { mdiLogin } from '@mdi/js'
  import VoTeamInvite from '../team/VoTeamInvite.vue'

  defineProps({
    external: Boolean,
  })

  const auth = useAuthStore()
  const notifications = useNotificationsStore()
  const one = useOneStore()
  const user = useUserStore()

  const { lgAndUp, smAndUp } = useDisplay()

  const color = computed(() => {
    return one.isOpen || !auth.user
      ? (user.one.colors.primary === 'surface-light'
        ? 'primary'
        : user.one.colors.primary)
      : 'surface-light'
  })

  const hasUnread = toRef(() => user.one.notifications.enabled && notifications.unread.length > 0)
  const hasMcpNew = toRef(() => one.isSubscriber && !user.ecosystem.mcp.seen)
  const showBadge = toRef(() => !!auth.user && (hasUnread.value || hasMcpNew.value))
  const badgeColor = toRef(() => hasMcpNew.value ? 'success' : 'error')

  function onClick () {
    if (!auth.user) {
      auth.dialog = true
    }
  }
</script>
