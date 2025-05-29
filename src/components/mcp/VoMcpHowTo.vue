<template>

  <p class="mb-4">
    View how to use this API Key to power your local MCP tools
    <a class="d-inline-block" href="#" @click.stop.prevent="">
      here
      <v-dialog v-slot="{ isActive }" activator="parent" max-width="700">
        <v-card
          prepend-icon="mdi-file-document"
          title="Quick Start"
        >
          <template #append>
            <v-icon-btn
              icon="mdi-close"
              @click="isActive.value = false"
            />
          </template>

          <v-divider />

          <v-card-text>
            To get started with your favorite IDE or AI agent, simply run the following command from
            your home
            directory
            <div class="bg-grey-darken-3 w-75 rounded pa-1 my-2">
              <code>npx -y @vuetify/mcp config --api-key="YOUR_KEY" </code>
            </div>
            Follow the on-screen prompts to complete the setup

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
    </a>
  </p>

</template>
<script lang="ts" setup>
</script>
