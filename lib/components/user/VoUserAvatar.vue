<template>
  <div>
    <v-avatar
      v-ripple="auth.isSubscriber"
      :class="[
        'border-md border-opacity-100 border-surface-variant',
        {
          'cursor-pointer': auth.isSubscriber,
        }
      ]"
      color="surface"
      size="72"
      text="Foobar"
      @click.prevent.stop="onClickAvatar"
    >
      <v-img
        v-if="auth.user && user.avatar"
        alt="User avatar"
        :src="user.avatar"
      />

      <v-icon
        v-else
        class="mt-1"
        icon="$vuetify"
        size="x-large"
      />
    </v-avatar>

    <div class="mb-2">
      <v-expand-transition>
        <div v-if="expanded">
          <v-card
            class="pt-6 pb-1"
            flat
            rounded="0"
          >
            <div class="d-flex ga-4 flex-wrap justify-center mb-4">
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
                  <v-avatar
                    eager
                    :image="avatar"
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
  </div>
</template>

<script setup lang="ts">
  const auth = useAuthStore()
  const one = useOneStore()
  const user = useUserStore()

  const expanded = shallowRef(false)

  const avatars = computed(() => {
    const array = [
      'https://cdn.vuetifyjs.com/docs/images/avatars/dark.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/blackguard.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/grass.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/wood.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/gold.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/planetary.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/grass-subscriber.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/wood-subscriber.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/gold-subscriber.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/planetary-subscriber.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/battlecruiser.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/cosmic-blue.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/blackhole.png',
      'https://cdn.vuetifyjs.com/docs/images/avatars/meteor.png',
    ]

    if (one.isSubscriber) {
      array.unshift('https://cdn.vuetifyjs.com/docs/images/avatars/one.png')
    }

    if (auth.user) {
      array.unshift(auth.user.picture)
    }

    return array
  })

  function onClickSelectAvatar (avatar: string) {
    user.avatar = avatar
  }

  function onClickAvatar () {
    if (!auth.isSubscriber) return

    expanded.value = !expanded.value
  }
</script>
