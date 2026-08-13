<template>
  <vo-app-bar logo="vone" />

  <v-empty-state
    headline="Please Login"
    icon="$vuetify"
    title="to continue to Vuetify One"
  />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()

onMounted(async () => {
  const redirectUri = route.query.redirect_uri as string | undefined
  const apiBase = import.meta.env.VITE_API_SERVER_URL as string

  // Settle the session before deciding — isAuthenticated is false until this resolves
  await auth.verify()

  // Already authenticated: hand straight back to the authorization server
  if (auth.isAuthenticated) {
    if (redirectUri && apiBase && redirectUri.startsWith(apiBase + '/')) {
      window.location.href = redirectUri
    }
    return
  }

  // This page exists only to log in — open the dialog and don't let it be dismissed
  auth.persistent = true
  auth.dialog = true
})

onUnmounted(() => {
  auth.persistent = false
})
</script>
