<script lang="ts" setup>
  const user = useUserStore()

  onMounted(() => {
    user.ecosystem.mcp.seen = true
  })
</script>

<template>
  <div class="px-3 py-3">
    <v-card-text>
      <VoDialogSubheader
        text="Connect your editor or AI agent to the Vuetify MCP server for live component APIs, docs, and examples."
        title="MCP Access"
      />

      <VoMcpHowTo />

      <p class="text-body-2 text-medium-emphasis mb-0 mt-6">
        Access is tied to your Vuetify One subscription. For manual configuration,
        self-hosting, or troubleshooting, see the
        <a
          class="text-primary"
          href="https://github.com/vuetifyjs/mcp#authentication"
          rel="noopener"
          target="_blank"
        >full documentation</a>.
      </p>
    </v-card-text>
  </div>
</template>
