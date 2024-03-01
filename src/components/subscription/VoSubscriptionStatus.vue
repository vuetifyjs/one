<template>
  <v-row>
    <v-col cols="12">
      <v-card
        prepend-icon="$vuetify"
        rounded="lg"
        title="Subscription Status"
        border
        flat
      >
        <template v-if="one.info" #subtitle>
          <div class="d-flex align-center">
            <span class="text-capitalize">{{ one.info.status }}</span>

            <template v-if="one.info.items.length">
              <span class="mx-1">—</span>

              <span class="me-1">
                ${{ one.info.items[0].plan.amount / 100 }}<span class="text-medium-emphasis text-caption">/{{ one.interval }}</span>
              </span>

              <VoBtn
                size="x-small"
                text="(Change Subscription)"
                variant="text"
                @click="emit('change:subscription')"
              />
            </template>
          </div>
        </template>

        <template v-else #subtitle>
          <div class="d-flex align-center">
            <v-skeleton-loader height="16" type="ossein" width="40" />

            <span class="mx-1">—</span>

            <v-skeleton-loader height="16" type="ossein" width="80" />
          </div>
        </template>

        <template #append>
          <VoBtn
            v-if="one.hasBilling && one.isSubscriber"
            :loading="one.isLoading"
            border="error sm"
            class="me-2"
            color="red"
            prepend-icon="$cancel"
            variant="plain"
            width="84"
          >
            Cancel

            <VoDialog
              v-model="cancelDialog"
              :prepend-icon="`svg:${mdiCloseCircle}`"
              height="auto"
              max-width="400"
              title="Cancel Subscription"
              width="auto"
            >
              <v-card-text>
                Are you sure? This is a permanent action and cannot be undone.
              </v-card-text>

              <template #actions="{ isActive }">
                <v-spacer />

                <VoBtn
                  :disabled="one.isLoading"
                  color="surface-variant"
                  text="No"
                  variant="plain"
                  @click="isActive.value = false"
                />

                <VoBtn
                  :loading="one.isLoading"
                  color="red"
                  text="Yes"
                  @click="onClickCancel"
                />
              </template>
            </VoDialog>
          </VoBtn>

          <VoBtn
            v-if="one.hasBilling && one.info?.status === 'canceled'"
            :loading="one.isLoading"
            class="me-2"
            color="success"
            prepend-icon="$success"
            text="Activate"
            variant="outlined"
            @click="onClickSubscribe"
          />

          <VoBtn
            v-if="one.hasBilling"
            :loading="one.isLoading"
            :prepend-icon="`svg:${mdiCreditCardSettingsOutline}`"
            text="Billing"
            @click="one.manage"
          />
        </template>
      </v-card>

      <div class="d-flex align-start justify-space-between text-caption py-2">
        <div>
          <template v-if="one.info?.status === 'active'">
            Your plan renews on <span class="font-weight-bold">
              {{ adapter.format(renewDate, 'fullDateWithWeekday') }}
            </span>.
          </template>

          <template v-else>
            Your plan ends on <span class="font-weight-bold">{{ adapter.format(one.info?.currentPeriodEnd, 'fullDateWithWeekday') }}</span>.
          </template>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  // Composables
  import { useDate } from 'vuetify'
  import { computed, shallowRef } from 'vue'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import {
    mdiCloseCircle,
    mdiCreditCardSettingsOutline,
  } from '@mdi/js'

  const adapter = useDate()
  const one = useOneStore()
  const emit = defineEmits(['change:subscription'])

  const cancelDialog = shallowRef(false)

  const renewDate = computed(() => {
    if (!one.info) return

    const date = new Date(one.info.currentPeriodEnd * 1000)

    return adapter.format(date, 'keyboardDate')
  })

  async function onClickSubscribe () {
    if (!one.interval) return

    one.isLoading = true

    one.subscribe(one.interval)
  }

  async function onClickCancel () {
    await one.cancel()

    cancelDialog.value = false
  }
</script>
