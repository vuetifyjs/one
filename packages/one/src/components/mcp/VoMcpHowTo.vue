<template>
  <div class="d-flex flex-column ga-6">
    <div
      v-for="(step, i) in steps"
      :key="step.title"
      class="d-flex ga-4"
    >
      <v-avatar
        class="flex-0-0"
        color="primary"
        size="28"
        :text="String(i + 1)"
      />

      <div class="flex-1-1">
        <div class="text-subtitle-1 font-weight-medium mb-1">{{ step.title }}</div>

        <p class="text-body-2 text-medium-emphasis mb-0">{{ step.text }}</p>

        <v-sheet
          v-if="step.command"
          border
          class="d-flex align-center ga-2 mt-3 pa-2 rounded"
          color="surface-variant"
        >
          <code class="flex-1-1 text-body-2">{{ step.command }}</code>

          <v-btn
            density="comfortable"
            :icon="copied ? '$success' : `svg:${mdiContentCopy}`"
            size="small"
            variant="text"
            @click="copy(step.command)"
          />
        </v-sheet>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { mdiContentCopy } from '@mdi/js'

  const { copy, copied } = useCopy()

  const steps = [
    {
      title: 'Configure your editor',
      text: 'Run this in a terminal. It detects your installed editors and adds the hosted Vuetify MCP server to the ones you pick.',
      command: 'npx -y @vuetify/mcp --remote',
    },
    {
      title: 'Restart your editor',
      text: 'MCP servers are read on startup, so reload the window or restart the app before continuing.',
    },
    {
      title: 'Sign in when prompted',
      text: 'The first time your editor connects it opens a browser to log in to Vuetify One. Approve it and the connection completes — there is no key to copy or paste.',
    },
    {
      title: 'Try it out',
      text: 'Ask your assistant for the props of a Vuetify component. If it answers from the live API, you are connected.',
    },
  ]
</script>
