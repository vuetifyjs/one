<template>
  <v-item-group v-model="subscription" class="mb-4" mandatory>
    <v-row>
      <v-col cols="12" md="6">
        <v-item :value="isYearly ? 'soloYear' : 'soloMonth'">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-100' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              rounded="lg"
              :subtitle="soloPrice"
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
        <v-item :value="isYearly ? 'teamYear' : 'teamMonth'">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-100' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              rounded="lg"
              :subtitle="teamPrice"
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

  <VoSwitch
    v-model="isYearly"
    class="d-flex justify-end"
    title="One Team"
  >
    <template #label>
      Yearly Billing

      <v-chip
        class="ml-2"
        color="success"
        size="small"
        text="Save 20%"
        variant="flat"
      />
    </template>
  </VoSwitch>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiCheckCircleOutline } from '@mdi/js'

  const dialog = shallowRef(false)
  const subscription = defineModel({
    type: String as PropType<'soloMonth' | 'soloYear' | 'teamMonth' | 'teamYear' | undefined>,
  })
  const one = useOneStore()

  const isYearly = ref(false)
  const soloPrice = computed(() => isYearly.value ? `$${import.meta.env.VITE_YEARLY_SOLO_PRICE} / Year` : `$${import.meta.env.VITE_MONTHLY_SOLO_PRICE} / Month`)
  const teamPrice = computed(() => isYearly.value ? `$${import.meta.env.VITE_YEARLY_TEAM_PRICE} / Year` : `$${import.meta.env.VITE_MONTHLY_TEAM_PRICE} / Month`)

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })

  watch(() => one.interval, val => {
    subscription.value = val
  }, { immediate: true })
</script>
