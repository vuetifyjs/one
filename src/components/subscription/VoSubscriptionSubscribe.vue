<template>
  <v-item-group v-model="type" class="mb-4" mandatory>
    <v-row>
      <v-col cols="12" md="6">
        <v-item value="solo">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-50' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              rounded="lg"
              :subtitle="`$${prices.solo[interval]}`"
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
              :border="isSelected ? 'sm primary opacity-50' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :disabled="disableTeam"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              rounded="lg"
              :subtitle="`$${prices.team[interval]}`"
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

  <v-switch
    v-model="interval"
    false-value="month"
    hide-details
    inset
    label="Yearly Billing (save 20%)"
    true-value="year"
  />
</template>

<script lang="ts" setup>
  // Icons
  import { mdiCheckCircleOutline } from '@mdi/js'

  const dialog = shallowRef(false)
  const interval = defineModel<'month' | 'year'>('interval', { default: 'year' })
  const type = defineModel<'solo' | 'team'>('type', { default: 'solo' })
  const one = useOneStore()
  const team = useTeamStore()

  const disableTeam = computed(() => team.hasTeamAccess && !team.isTeamOwner)

  const prices = {
    solo: {
      month: '2.99 /month',
      year: '29.99 /year',
    },
    team: {
      month: '29.99 /month',
      year: '299.99 /year',
    },
  }

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })
</script>
