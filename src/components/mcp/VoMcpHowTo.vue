<template>
  <v-expansion-panels bg-color="surface-variant" class="mb-4" variant="accordion">
    <v-expansion-panel>
      <template #title>
        <v-icon :icon="`svg:${mdiFileDocument}`" opacity="0.6" start />

        How to Use Your API Key with Vuetify MCP
      </template>

      <v-expansion-panel-text class="bg-surface-light rounded-b">
        <strong>Quick Setup</strong>

        <p class="mb-4 mt-2">
          Run the following command to configure your favorite IDE or AI agent:
        </p>

        <div class="my-4">
          <code class="bg-surface-variant rounded pa-2 d-block">
            {{ displayInstall }}

            <v-icon
              class="ms-2"
              end
              :icon="copied ? '$success' : `svg:${mdiContentCopy}`"
              size="1em"
              @click="copy(install)"
            />
          </code>
        </div>

        <p class="mb-2">Follow the on-screen prompts to complete the setup.</p>

        <p>
          For hosted server setup, manual configuration, or troubleshooting, see the
          <a
            class="text-primary"
            href="https://github.com/vuetifyjs/mcp#authentication"
            rel="noopener"
            target="_blank"
          >full documentation</a>.
        </p>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script lang="ts" setup>
  import { mdiFileDocument, mdiContentCopy } from '@mdi/js'

  const api = useApiKeyStore()
  const { copy, copied } = useCopy()

  const install = computed(() => {
    const key = api.key || 'YOUR_KEY'

    return `npx -y @vuetify/mcp config --api-key="${key}"`
  })

  const displayInstall = computed(() => {
    if (!api.key) return install.value

    return `npx -y @vuetify/mcp config --api-key="${api.trim}"`
  })
</script>
