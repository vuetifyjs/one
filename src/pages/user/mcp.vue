<template>
  <v-app>
    <v-container>
      <v-card max-width="700" prepend-icon="mdi-key-variant" title="API Key">
        <template #append>
          <v-icon-btn icon="mdi-close" />
        </template>

        <v-divider />

        <v-card-text>
          <p class="mb-2">
            As a subscriber of Vuetify One, you have access to create a personal
            MCP API key.
          </p>

          <p class="mb-2">
            Do not share your API key with others or expose it in the browser or
            other client-side code. To protect your account's security, Vuetify
            may disable any API key that has leaked publicly.
          </p>

          <p :class="apiKey && 'mb-4'">
            View how to use this API Key to power your local MCP tools
            <a class="d-inline-block" href="#" @click.stop.prevent="">
              here

              <v-dialog
                v-slot="{ isActive }"
                activator="parent"
                max-width="700"
              >
                <v-card
                  prepend-icon="mdi-file-document"
                  title="Usage Instructions"
                >
                  <template #append>
                    <v-icon-btn
                      icon="mdi-close"
                      @click="isActive.value = false"
                    />
                  </template>

                  <v-divider />

                  <v-card-text>
                    <h3>Use with Claude</h3>
                    TODO:
                  </v-card-text>

                  <v-card-text>
                    <h3>Use with Cursor</h3>
                    TODO:
                  </v-card-text>

                  <v-card-text>
                    <h3>Use with VSCode</h3>
                    TODO:
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer />

                    <v-btn
                      class="text-none"
                      color="surface-variant"
                      size="small"
                      text="Close"
                      variant="flat"
                      @click="isActive.value = false"
                    />
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </a>.
          </p>

          <v-table v-if="apiKey" class="rounded border">
            <thead>
              <tr>
                <th>Secret&nbsp;Key</th>

                <th>Created</th>

                <th class="d-flex align-center">
                  Last Used
                  <v-icon
                    v-tooltip:top="'This is updated within the last 10 minutes'"
                    end
                    icon="$info"
                    size="1em"
                  />
                </th>

                <th class="text-center">Usage</th>

                <th class="text-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  {{ apiKey.slice(0, 5) }}...{{ apiKey.slice(-4) }}
                </td>

                <td>{{ apiKey.createdAt }}</td>

                <td>{{ apiKey.lastUsedAt }}</td>

                <td class="d-flex align-center justify-center ga-4">
                  <span>{{ `${apiKey.usage}/${apiKey.limit}` }}</span>

                  <v-progress-linear
                    :max="apiKey.limit"
                    :model-value="apiKey.usage"
                    rounded
                    rounded-bar
                    style="width: 100px"
                  />
                </td>

                <td class="text-end">
                  <v-icon-btn
                    color="info"
                    icon="mdi-refresh"
                    :loading="isLoading.has('refresh')"
                    :readonly="isLoading.has('refresh')"
                    size="small"
                    variant="text"
                    @click="onClickRefresh"
                  />

                  <v-icon-btn
                    color="error"
                    icon="mdi-trash-can-outline"
                    size="small"
                    variant="text"
                    @click="onClickDelete"
                  />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>

        <v-divider v-if="!apiKey" />

        <v-card-actions v-if="!apiKey">
          <v-spacer />

          <v-btn
            class="text-none"
            color="success"
            :loading="isLoading.has('api-key')"
            prepend-icon="mdi-plus"
            text="Generate API Key"
            variant="flat"
            @click="onClickGenerate"
          />
        </v-card-actions>
      </v-card>
    </v-container>

    <v-dialog v-slot="{ isActive }" v-model="dialog" max-width="500">
      <v-card prepend-icon="mdi-hand-okay" title="Save your Key">
        <template #append>
          <v-icon-btn icon="mdi-close" @click="isActive.value = false" />
        </template>

        <v-divider />

        <v-card-text>
          <p class="mb-4">
            Please save your secret key in a safe place since
            <strong>you won't be able</strong> to view it again. Keep it secure,
            as anyone with your API key can make requests on your behalf. If you
            do lose it, you'll need to generate a new one.
          </p>

          <v-text-field
            v-if="apiKey"
            :ref="el => apiKeyField = el"
            color="success"
            :model-value="apiKey"
            variant="outlined"
          >
            <template #append-inner>
              <v-btn
                class="text-none"
                color="success"
                :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
                size="small"
                variant="flat"
                @click="onClickCopy"
              >
                <template #prepend>
                  <v-fade-transition hide-on-leave>
                    <v-icon :key="String(copied)" />
                  </v-fade-transition>
                </template>

                Copy
              </v-btn>
            </template>
          </v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            class="text-none"
            color="surface-variant"
            size="small"
            text="Done"
            variant="flat"
            @click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts" setup>

  definePage({
    meta: {
      requiresAuth: true,
    },
  })
  import { useHttpStore } from '@/stores/http'
  import { nextTick, ref, shallowRef } from 'vue'

  const apiKey = ref(null)
  const dialog = shallowRef(false)
  const isLoading = ref(new Set())
  const apiKeyField = ref()
  const copied = shallowRef(false)
  const http = useHttpStore()

  async function onClickGenerate (immediate = false) {
    isLoading.value.add('api-key')

    const token = await http.fetch('/one/mcp/generate')
    apiKey.value = token.accessToken

    isLoading.value.delete('api-key')
    isLoading.value.delete('refresh')

    dialog.value = true

    nextTick(() => {
      apiKeyField.value.focus()
      setTimeout(() => (apiKeyField.value.select(), 500))
    })
  }

  function onClickDelete () {
    apiKey.value = null
  }

  function onClickCopy () {
    copied.value = true
    navigator.clipboard.writeText(apiKey.value)

    setTimeout(() => (copied.value = false), 1000)
  }

  async function onClickRefresh () {
    isLoading.value.add('refresh')

    await onClickGenerate()
  }
</script>
