<template>
  <v-row>
    <v-col cols="12">
      <VoDialogSubheader
        text="View and download your invoice history."
        title="Invoice History"
      />

      <v-card
        border
        height="450"
        rounded="lg"
      >
        <v-data-table-virtual
          :items="one.invoices"
          :loading="one.isLoading"
          sticky
        >
          <template #item.date="{ item }">
            <div class="text-caption">
              {{ date.format(new Date(item.date * 1000), 'fullDateWithWeekday') }}
            </div>
          </template>

          <template #item.amount="{ item }">
            ${{ item.amount / 100 }}
          </template>

          <template #item.status="{ item }">
            <v-chip
              border="success sm"
              class="text-capitalize"
              color="success"
              label
              size="small"
              :text="item.status"
              variant="tonal"
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  // Composables
  import { useDate } from 'vuetify'

  // Stores
  import { useOneStore } from '@/stores/one'

  // Icons
  import { mdiFileDocument } from '@mdi/js'

  const date = useDate()
  const one = useOneStore()
</script>
