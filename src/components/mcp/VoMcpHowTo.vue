<template>

  <p class="mb-4">
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

</template>
