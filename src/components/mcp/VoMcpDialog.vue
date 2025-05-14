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

            <VoMcpHowTo/>

            <v-row class="my-4" justify="center">
              <v-col cols="auto">
                <v-btn
                  v-if="!apiKey?.accessToken"
                  :prepend-icon="`svg:${mdiPlus}`"
                  color="success"
                  text="Generate API Key"
                  variant="flat"
                  @click="onClickGenerateKey(false)"
                />
                <v-btn
                  v-else
                  :prepend-icon="`svg:${mdiPlus}`"
                  color="success"
                  text="Regenerate API Key"
                  variant="flat"
                  @click="onClickGenerateKey(true)"
                />
              </v-col>
            </v-row>

            <template v-if="apiKey?.id">
              <VoMcpTokenTable :api-key="apiKey"/>

              <VoMcpCopyDialog v-model="copyDialog" :api-key="apiKey.accessToken"/>
            </template>

          </v-card-text>
        </div>
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
interface AccessToken {
  id: string
  accessToken: string
  createdAt: string
  updatedAt: string
}

import VoMcpCopyDialog from '@/components/mcp/VoMcpCopyDialog.vue'
import { mdiKeyVariant, mdiPlus } from '@mdi/js'

const http = useHttpStore()
const apiKey = ref<AccessToken | null>(null)
const copyDialog = ref(false)

const dialog = defineModel('modelValue', { type: Boolean })

async function onClickGenerateKey (regenerate: boolean = false) {
  const slug = regenerate ? 'regenerate' : 'generate'
  const token = await http[regenerate ? 'post' : 'fetch'](`/one/mcp/${slug}`)
  apiKey.value = token
  copyDialog.value = true
}

watch(dialog, async val => {
  if (val) {
    const res = await http.fetch('/one/mcp/getToken')
    if (res.accessToken) apiKey.value = res
  }
})


</script>
