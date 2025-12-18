<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiHandHeart}`"
    title="Sponsorships"
  >
    <v-layout>
      <v-main scrollable>
        <div class="px-3 pb-5 d-flex flex-column h-100">
          <v-card-text class="flex-0-0 mb-16 mb-sm-4">
            <VoDialogSubheader
              text="Support Vuetify through GitHub Sponsors or Discord to unlock exclusive benefits and content."
              title="Support Vuetify"
            />

            <VoSponsorshipsTimeline />
          </v-card-text>

          <v-empty-state
            class="flex-1-0"
            icon="$vuetify"
            min-height="auto"
            size="128"
          >
            <template #media>
              <v-icon :color="one.isSubscriber ? 'success' : 'error'" />
            </template>

            <template #title>
              One Status:

              <span class="font-weight-black">{{ one.isSubscriber ? 'Active' : 'Inactive' }}</span>
            </template>

            <template #text>
              <div class="text-caption text-medium-emphasis">
                {{ one.isSubscriber ? 'You are currently receiving benefits of Vuetify One.' : 'Login to activate Vuetify One benefits' }}
              </div>
            </template>
          </v-empty-state>

          <v-divider class="my-4" />

          <v-btn
            block
            color="primary"
            variant="text"
            @click="organizationDialog = true"
          >
            Sponsored through your organization
          </v-btn>
        </div>
      </v-main>
    </v-layout>

    <VoSponsorshipsOrganizationDialog
      v-model="organizationDialog"
      @success="handleOrganizationClaimSuccess"
    />
  </VoDialog>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiHandHeart } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })
  const organizationDialog = shallowRef(false)

  const query = useQuery<{ one: string }>()
  const one = useOneStore()

  watch(query, async () => {
    if (query.value.one !== 'sponsorships') return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })

  function handleOrganizationClaimSuccess () {
    organizationDialog.value = false
    dialog.value = false
  }
</script>
