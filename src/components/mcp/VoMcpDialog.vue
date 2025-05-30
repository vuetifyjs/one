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
                  v-if="!apiKey?.apiKey"
                  color="success"
                  :prepend-icon="`svg:${mdiPlus}`"
                  text="Generate API Key"
                  variant="flat"
                  @click="onClickGenerateKey(false)"
                />
                <v-btn
                  v-else
                  color="success"
                  :prepend-icon="`svg:${mdiPlus}`"
                  text="Regenerate API Key"
                  variant="flat"
                  @click="onClickGenerateKey(true)"
                />
              </v-col>
            </v-row>

            <template v-if="apiKey?.id">
              <VoMcpTokenTable :api-key="apiKey" />

              <VoMcpCopyDialog v-model="copyDialog" :api-key="apiKey.apiKey" />
            </template>

          </v-card-text>
        </div>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  import VoMcpCopyDialog from '@/components/mcp/VoMcpCopyDialog.vue'
  import { mdiKeyVariant, mdiPlus } from '@mdi/js'

  interface AccessToken {
    id: string
    apiKey: string
    createdAt: string
    updatedAt: string
  }

  const http = useHttpStore()
  const apiKey = ref<AccessToken | null>(null)
  const copyDialog = ref(false)

  const dialog = defineModel('modelValue', { type: Boolean })

  async function onClickGenerateKey (regenerate = false) {
    const slug = regenerate ? 'regenerate' : 'generate'
    const token = await http[regenerate ? 'post' : 'fetch'](`/one/mcp/${slug}`)
    apiKey.value = token
    copyDialog.value = true
  }

  watch(dialog, async val => {
    if (val) {
      const res = await http.fetch('/one/mcp/getToken')
      if (res.apiKey) apiKey.value = res
    }
  })

</script>
