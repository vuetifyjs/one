<template>
  <v-menu
    ref="menu"
    v-model="one.isOpen"
    activator="parent"
    :close-on-click="false"
    :close-on-content-click="false"
    eager
    location="bottom end"
  >
    <v-card
      border
      rounded="lg"
      width="280"
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
  // Components
  import type { VMenu } from 'vuetify/components'

  const banners = useBannersStore()
  const one = useOneStore()

  const menu = ref<VMenu>()

  watch(() => banners.banner, async () => {
    await new Promise(resolve => setTimeout(resolve, 300))

    if (!one.isOpen) return

    // @ts-expect-error argument should be optional
    menu.value?.updateLocation?.()
  }, { flush: 'pre' })
</script>
