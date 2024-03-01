<template>
  <v-row>
    <v-col cols="12">
      <v-label class="font-weight-black">Invoice History</v-label>

      <div class="mb-3 text-caption text-medium-emphasis">
        View and download your invoice history.
      </div>

      <v-divider />

      <v-data-table-virtual
        :items="one.invoices"
        :loading="one.isLoading"
        height="280"
      >
        <template #item.date="{ item }">
          <div class="text-caption">
            {{ date.format(item.date, 'fullDateWithWeekday') }}
          </div>
        </template>

        <template #item.amount="{ item }">
          ${{ item.amount / 100 }}
        </template>

        <template #item.status="{ item }">
          <v-chip
            :text="item.status"
            border="success sm"
            class="text-capitalize"
            color="success"
            size="small"
            variant="tonal"
            label
          />
        </template>

        <template #item.pdf="{ item }">
          <v-btn
            :href="item.pdf"
            :icon="`svg:${mdiFileDocument}`"
            size="small"
            target="_blank"
            variant="text"
          />
        </template>
      </v-data-table-virtual>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  // Composables
  import { useDate } from 'vuetify'

  // Stores
  import { useOneStore } from '@/store/one'

  // Icons
  import { mdiFileDocument } from '@mdi/js'

  const date = useDate()
  const one = useOneStore()
</script>
