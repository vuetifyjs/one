<template>
  <v-tabs v-model="interval" color="primary" mandatory>
    <v-tab value="month">Monthly billing</v-tab>
    <v-tab value="year">
      Yearly billing
      <v-chip
        class="ml-2"
        color="success"
        size="small"
        text="Save 2 months"
        variant="flat"
      />
    </v-tab>
  </v-tabs>

  <v-item-group v-model="type" class="mb-4" mandatory>
    <v-row>
      <v-col cols="12" md="6">
        <v-item value="solo">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-100' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              rounded="lg"
              :subtitle="prices.solo[interval]"
              title="Solo Developer"
              :variant="isSelected ? 'tonal' : 'text'"
              @click="toggle"
            >
              <template #prepend>
                <v-icon class="mt-n6" />
              </template>
            </v-card>
          </template>
        </v-item>
      </v-col>

      <v-col cols="12" md="6">
        <v-item value="team">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-100' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              rounded="lg"
              :subtitle="prices.team[interval]"
              title="Team Access"
              :variant="isSelected ? 'tonal' : 'text'"
              @click="toggle"
            >
              <template #prepend>
                <v-icon class="mt-n6" />
              </template>
            </v-card>
          </template>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiCheckCircleOutline } from '@mdi/js'

  const dialog = shallowRef(false)
  const interval = defineModel('interval', {
    type: String as PropType<'month' | 'year'>,
    default: 'month',
  })
  const type = defineModel('type', {
    type: String as PropType<'solo' | 'team'>,
    default: 'solo',
  })
  const one = useOneStore()

  const prices = {
    solo: {
      month: import.meta.env.VITE_MONTHLY_SOLO_PRICE + ' / Month',
      year: import.meta.env.VITE_YEARLY_SOLO_PRICE + ' / Year',
    },
    team: {
      month: import.meta.env.VITE_MONTHLY_TEAM_PRICE + ' / Month',
      year: import.meta.env.VITE_YEARLY_TEAM_PRICE + ' / Year',
    },
  }

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })
</script>
