<template>
  <v-avatar
    v-ripple="auth.isSubscriber"
    size="72"
    color="surface"
    :class="[
      'border-surface-light border-lg border-opacity-100',
      {
        'cursor-pointer': auth.isSubscriber,
      }
    ]"
    text="Foobar"
    @click="onClickAvatar"
  >
    <v-img
      v-if="auth.user && user.avatar"
      :src="user.avatar"
      alt="User avatar"
    />

    <v-icon
      v-else
      size="x-large"
      icon="$vuetify"
      class="mt-1"
    />
  </v-avatar>

  <div class="py-2">
    <v-expand-transition>
      <div v-if="expanded" v-click-outside="onClickOutside">
        <v-card
          class="d-flex ga-4 flex-wrap justify-center py-6"
          color="rgba(var(--v-theme-primary), 0.5)"
          rounded="0"
          variant="tonal"
        >
          <template
            v-for="(avatar, i) in avatars"
            :key="i"
          >
            <v-btn
              :active="user.avatar === avatar"
              icon
              variant="flat"
              @click="onClickSelectAvatar(avatar)"
            >
              <v-avatar :image="avatar" />
            </v-btn>
          </template>
        </v-card>
      </div>
    </v-expand-transition>
  </div>

  <div class="text-h6">
    {{ auth.user?.name ?? 'Guest' }}
  </div>
</template>

<script setup lang="ts">
  // Utilities
  import { computed, shallowRef } from 'vue'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const user = useUserStore()

  const expanded = shallowRef(false)

  const avatars = computed(() => {
    const array = [
      'https://cdn.vuetifyjs.com/docs/images/avatars/one.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/grass.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/wood.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/gold.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/planet.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/planetary.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/light.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/dark.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/blackguard.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/battlecruiser.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/cosmic-blue.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/blackhole.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/meteor.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/tada.png',
    ]

    if (auth.user) {
      array.unshift(auth.user.picture)
    }

    return array
  })

  function onClickOutside () {
    expanded.value = false
  }

  function onClickSelectAvatar (avatar: string) {
    user.avatar = avatar
  }

  function onClickAvatar () {
    if (!auth.user) return

    expanded.value = !expanded.value
  }
</script>
