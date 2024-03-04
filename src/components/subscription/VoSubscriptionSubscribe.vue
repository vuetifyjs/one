<template>
  <v-item-group v-model="subscription">
    <v-row>
      <v-col cols="12" md="6">
        <v-item value="month">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-100' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              :variant="isSelected ? 'tonal' : 'text'"
              rounded="lg"
              subtitle="$2.99/month"
              title="Monthly"
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
        <v-item value="year">
          <template #default="{ toggle, isSelected }">
            <v-card
              :border="isSelected ? 'sm primary opacity-100' : 'sm'"
              :color="isSelected ? 'primary' : undefined"
              :prepend-icon="isSelected ? `svg:${mdiCheckCircleOutline}` : '$radioOff'"
              :variant="isSelected ? 'tonal' : 'text'"
              rounded="lg"
              subtitle="$29.99/year"
              title="Yearly"
              @click="toggle"
            >
              <template #prepend>
                <v-icon class="mt-n6" />
              </template>

              <template #append>
                <v-chip
                  class="mt-n6"
                  color="success"
                  size="small"
                  text="Save 20%"
                  variant="flat"
                />
              </template>
            </v-card>
          </template>
        </v-item>
      </v-col>
    </v-row>
  </v-item-group>
</template>

<script lang="ts" setup>
  // Utilities
  import { PropType, shallowRef, watch } from 'vue'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiCheckCircleOutline } from '@mdi/js'

  const dialog = shallowRef(false)
  const subscription = defineModel({
    type: String as PropType<'month' | 'year' | undefined>,
  })

  const one = useOneStore()

  watch(dialog, async val => {
    if (val) one.subscriptionInfo()
  })

  watch(() => one.interval, val => {
    subscription.value = val
  }, { immediate: true })
</script>
