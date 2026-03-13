<script lang="ts" setup>
  import { mdiPlus, mdiRefresh } from '@mdi/js'

  const api = useApiKeyStore()
  const user = useUserStore()
  const copyDialog = shallowRef(false)

  async function onClickGenerateKey (regenerate = false) {
    await api.generate(regenerate)
    copyDialog.value = true
  }

  onMounted(async () => {
    user.ecosystem.mcp.seen = true
    await api.fetch()
  })
</script>

<template>
  <div class="px-3 py-3">
    <v-card-text>
      <VoDialogSubheader
        text="As a subscriber of Vuetify One, you have access to create a personal MCP API key."
        title="MCP Access Token"
      />

      <p class="mb-2">
        Do not share your API key with others or expose it in the browser or
        other client-side code. To protect your account's security, Vuetify
        may disable any API key that has leaked publicly.
      </p>

      <VoMcpHowTo />

      <v-row v-if="!api.key || !api.regenerated" class="my-4 justify-center">
        <v-col cols="auto">
          <v-btn
            v-if="!api.key"
            color="success"
            :prepend-icon="`svg:${mdiPlus}`"
            text="Generate API Key"
            variant="flat"
            @click="onClickGenerateKey(false)"
          />

          <v-btn
            v-else-if="!api.regenerated"
            color="success"
            :prepend-icon="`svg:${mdiRefresh}`"
            text="Regenerate API Key"
            variant="flat"
            @click="onClickGenerateKey(true)"
          />
        </v-col>
      </v-row>

      <template v-if="api.key">
        <VoMcpTokenTable />

        <VoMcpCopyDialog v-model="copyDialog" />
      </template>
    </v-card-text>
  </div>
</template>
