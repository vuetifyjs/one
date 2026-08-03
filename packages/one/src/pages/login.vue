<template>
  <vo-app-bar logo="vone" />

  <v-empty-state
    headline="Please Login"
    icon="$vuetify"
    title="to access Playground"
  />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const route = useRoute()
const auth = useAuthStore()

// If already authenticated when landing here with a redirect_uri, redirect immediately
onMounted(() => {
  if (!auth.isAuthenticated) return
  const redirectUri = route.query.redirect_uri as string | undefined
  const apiBase = import.meta.env.VITE_API_SERVER_URL as string
  if (redirectUri && apiBase && redirectUri.startsWith(apiBase + '/')) {
    window.location.href = redirectUri
  }
})
</script>