<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiKeyVariant}`"
    title="MCP Access"
  >
    <v-layout>
      <v-main scrollable />
      <div class="px-3 py-3">
        <v-card-text>
          <VoDialogSubheader
            text="As a subscriber of Vuetify One, you have access to create a personal
          MCP API key."
            title="MCP Access Token"
          />
          <p class="mb-2">
            Do not share your API key with others or expose it in the browser or
            other client-side code. To protect your account's security, Vuetify
            may disable any API key that has leaked publicly.
          </p>

          <v-btn
            class="text-none"
            color="success"
            prepend-icon="mdi-plus"
            text="Generate API Key"
            variant="flat"
          />
        </v-card-text>
      </div>
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  import { mdiKeyVariant } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })

</script>
