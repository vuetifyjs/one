<template>
  <v-menu>
    <template #activator="{ props: activatorProps }">
      <v-btn
        v-if="!auth.user && !auth.isLoading"
        v-bind="{
          ...activatorProps,
          [`${lgAndUp ? 'append-' : ''}icon`]: `svg:${mdiLogin}`,
          text: lgAndUp ? 'Login' : undefined,
        }"
        :rounded="mdAndDown"
        class="text-none"
        color="primary"
        variant="outlined"
      />

      <VoUserBtn v-else />
    </template>

    <VoUserMenu />
  </v-menu>
</template>

<script lang="ts" setup>
  // Utilities
  import { useDisplay } from 'vuetify'

  // Stores
  import { useAuthStore } from '@/store/auth'

  // Icons
  import { mdiLogin } from '@mdi/js'

  const props = defineProps({
    external: Boolean,
  })

  const auth = useAuthStore()

  const { lgAndUp, mdAndDown } = useDisplay()
</script>
