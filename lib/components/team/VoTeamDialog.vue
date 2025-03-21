<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiBell}`"
    title="Team"
  >
    <span class="text-center">Team id: {{ team?.id }}</span>
    <span class="text-center">Team name: {{ team?.name }}</span>
    <span class="text-center">Invite Code: {{ team?.inviteCode }}</span>  </VoDialog>
</template>

  <script setup lang="ts">
    // Icons
  import { mdiBell } from '@mdi/js'

  const auth = useAuthStore()
  const team = computed(() => {
    return auth?.user?.team
  })

  console.log(auth.user)

  const dialog = defineModel('modelValue', { type: Boolean })
  </script>
