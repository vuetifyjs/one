<template>
  <v-row>
    <v-col cols="12">
      <v-card
        border
        flat
        prepend-icon="$vuetify"
        rounded="lg"
        title="Subscription Status"
      >
        <template #prepend>
          <v-icon :color="one.isSubscriber ? 'success' : undefined" />
        </template>

        <template v-if="one.info" #subtitle>
          <div class="d-flex align-center">
            <strong key="status" class="text-capitalize hidden-sm-and-down" v-text="one.info.status" />

            <template v-if="one.info.items.length > 0">
              <span class="mx-1 hidden-sm-and-down">—</span>

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
            v-if="one.hasBilling && one.info?.status === 'canceled'"
            class="me-2"
            color="success"
            :loading="one.isLoading"
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
  // Icons
  import { mdiCreditCardSettingsOutline } from '@mdi/js'

  const adapter = useDate()
  const one = useOneStore()
  const emit = defineEmits(['change:subscription'])

  const renewDate = computed(() => {
    if (!one.info) return

    const date = new Date(one.info.currentPeriodEnd * 1000)

    return adapter.format(date, 'keyboardDate')
  })

  async function onClickSubscribe () {
    if (!one.interval || !one.subscriptionType) return

    one.isLoading = true

    one.subscribe(one.interval, one.subscriptionType)
  }
</script>
