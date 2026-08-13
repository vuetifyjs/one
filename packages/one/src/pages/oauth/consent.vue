<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="5" lg="4">
        <v-card rounded="lg" elevation="4">
          <v-card-title class="text-h6 pa-6 pb-2">Authorize Access</v-card-title>

          <v-card-text class="pa-6 pt-2">
            <p class="text-body-1">
              <strong>{{ displayName }}</strong> is requesting access to your Vuetify One account.
            </p>
          </v-card-text>

          <v-card-actions class="pa-6 pt-0">
            <form method="POST" :action="`${apiBase}/oauth/authorize/deny`">
              <v-btn type="submit" variant="outlined">Decline</v-btn>
            </form>
            <v-spacer />
            <form method="POST" :action="`${apiBase}/oauth/authorize/approve`">
              <v-btn type="submit" color="primary" variant="flat">Allow</v-btn>
            </form>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { toRef } from 'vue'
  import { useRoute } from 'vue-router'

  const route = useRoute()

  const clientId = toRef(() => route.query.client_id as string)
  const displayName = toRef(() => (route.query.client_name as string) || clientId.value || 'An external application')

  const apiBase = import.meta.env.VITE_API_SERVER_URL as string
</script>
