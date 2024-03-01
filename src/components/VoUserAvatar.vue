<template>
  <v-avatar
    :class="[
      'border-lg border-opacity-100 border-surface-light',
      {
        'cursor-pointer': auth.isSubscriber,
      }
    ]"
    color="surface"
    size="72"
    text="Foobar"
    v-ripple="auth.isSubscriber"
    @click.prevent.stop="onClickAvatar"
  >
    <v-img
      v-if="auth.user && user.avatar"
      :src="user.avatar"
      alt="User avatar"
    />

    <v-icon
      v-else
      class="mt-1"
      icon="$vuetify"
      size="x-large"
    />
  </v-avatar>

  <div class="mb-4">
    <v-expand-transition>
      <div v-if="expanded">
        <v-card
          class="pt-6 pb-1 mt-4"
          color="rgba(var(--v-theme-primary), 0.5)"
          rounded="0"
          variant="tonal"
        >
          <div class="d-flex ga-4 flex-wrap justify-center mb-4">
            <template
              v-for="(avatar, i) in avatars"
              :key="i"
            >
              <v-btn
                :active="user.avatar === avatar"
                variant="flat"
                icon
                @click="onClickSelectAvatar(avatar)"
              >
                <v-avatar
                  :image="avatar"
                  eager
                />
              </v-btn>
            </template>
          </div>
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
    if (!auth.isSubscriber) return

    expanded.value = !expanded.value
  }
</script>
