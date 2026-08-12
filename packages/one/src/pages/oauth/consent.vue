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
            <v-btn variant="outlined" @click="deny">Decline</v-btn>
            <v-spacer />
            <v-btn color="primary" variant="flat" @click="approve">Allow</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pending = computed(() => route.query.pending as string)
const clientId = computed(() => route.query.client_id as string)
const displayName = computed(() => (route.query.client_name as string) || clientId.value || 'An external application')

const apiBase = import.meta.env.VITE_API_SERVER_URL as string

function approve () {
  window.location.href = `${apiBase}/oauth/authorize/approve?pending=${encodeURIComponent(pending.value)}`
}

function deny () {
  window.location.href = `${apiBase}/oauth/authorize/deny?pending=${encodeURIComponent(pending.value)}`
}
</script>