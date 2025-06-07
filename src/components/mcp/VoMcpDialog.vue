<template>
  <VoDialog
    v-model="dialog"
    height="auto"
    :prepend-icon="`svg:${mdiKey}`"
    title="API Key"
  >
    <v-layout>
      <v-main>
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

            <v-row v-if="!api.key || !api.regenerated" class="my-4" justify="center">
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
      </v-main>
    </v-layout>
  </VoDialog>
</template>

<script lang="ts" setup>
  import { mdiKey, mdiPlus, mdiRefresh } from '@mdi/js'

  const api = useApiKeyStore()
  const copyDialog = shallowRef(false)

  const dialog = defineModel<boolean>('modelValue')

  async function onClickGenerateKey (regenerate = false) {
    await api.generate(regenerate)
    copyDialog.value = true
  }

  watch(dialog, async val => {
    if (val) await api.fetch()
  })
</script>
