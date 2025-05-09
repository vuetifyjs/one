<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiKeyVariant}`"
    title="MCP Access"
  >
    <v-layout>
      <v-main>
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

            <VoMcpHowTo />

            <v-row class="my-4" justify="center">
              <v-col cols="auto">
                <v-btn
                  color="success"
                  :prepend-icon="`svg:${mdiPlus}`"
                  text="Generate API Key"
                  variant="flat"
                  @click="onClickGenerateKey"
                />
              </v-col>
            </v-row>

            <VoMcpTokenTable v-if="apiKey?.id" :api-key="apiKey" />

          </v-card-text>
        </div>
      </v-main></v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  import { mdiKeyVariant, mdiPlus } from '@mdi/js'

  const http = useHttpStore()
  const apiKey = ref(null)

  const dialog = defineModel('modelValue', { type: Boolean })

  async function onClickGenerateKey () {
    const token = await http.fetch('/one/mcp/generate')
    apiKey.value = token.accessToken
  }

</script>
