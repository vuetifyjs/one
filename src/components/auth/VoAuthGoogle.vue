<template>
  <v-list-item
    base-color="#2a2a2a"
    rounded="pill"
    slim
    variant="flat"
    @click="auth.login('google')"
  >
    <template #title>
      <span class="text-body-2">
        <span
          v-for="(word, index) in words"
          :key="index"
          :style="{ color: wordColors[index % wordColors.length] }"
        >
          {{ word }}{{ index < words.length - 1 ? ' ' : '' }}
        </span>
      </span>
    </template>

    <template #prepend>
      <v-icon color="#4285F4" icon="mdiGoogle" />
    </template>

    <template
      v-if="(!auth.user && auth.lastLoginProvider() === 'google')"
      #subtitle
    >
      <div class="text-caption mt-n1">Last Used</div>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  const auth = useAuthStore()

  const hasIdentity = computed(() => {
    return auth.user && auth.findIdentity('google')
  })

  const text = computed(() => {
    if (!auth.user) return 'Login with Google'
    if (hasIdentity.value) return 'Connected to Google'

    return 'Connect Google'
  })

  const words = computed(() => text.value.split(' '))

  const wordColors = ['#EA4335', '#FBBC04', '#34A853']
</script>
