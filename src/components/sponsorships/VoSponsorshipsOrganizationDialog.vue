<template>
  <v-dialog v-model="dialog" max-width="600">
    <template #default="{ isActive }">
      <v-card
        :prepend-icon="`svg:${mdiDomain}`"
        title="Claim Organization Sponsorship"
      >
        <template #append>
          <v-btn
            icon="$close"
            @click="isActive.value = false"
          />
        </template>

        <template #text>
          <div class="text-body-2 mb-4">
            If your organization sponsors Vuetify through Open Collective or GitHub,
            you can claim access to Vuetify One benefits.
          </div>

          <v-row>
            <v-col cols="12" sm="6">
              <v-card
                border
                hover
                :prepend-avatar="`${settings.CDN_URL}logos/opencollective.png`"
                @click="handleClaim('opencollective', isActive)"
              >
                <template #title>Open Collective</template>
                <template #subtitle>
                  Claim through Open Collective sponsorship
                </template>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6">
              <v-card
                border
                hover
                :prepend-avatar="`${settings.CDN_URL}logos/github.png`"
                @click="handleClaim('github', isActive)"
              >
                <template #title>GitHub</template>
                <template #subtitle>
                  Claim through GitHub Sponsors
                </template>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  // Types
  import type { Ref } from 'vue'

  // Icons
  import { mdiDomain } from '@mdi/js'

  const dialog = defineModel<boolean>('modelValue')

  const one = useOneStore()
  const settings = useSettingsStore()

  const emit = defineEmits<{
    success: []
  }>()

  async function handleClaim (
    platform: 'opencollective' | 'github',
    isActive: Ref<boolean>,
  ) {
    const success = await one.claimOrganization(platform)
    if (success) {
      isActive.value = false
      emit('success')
    }
  }
</script>
