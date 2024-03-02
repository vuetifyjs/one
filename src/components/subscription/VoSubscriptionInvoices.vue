<template>
  <v-row>
    <v-col cols="12">
      <VoDialogSubheader
        text="View and download your invoice history."
        title="Invoice History"
      />

      <v-card
        height="350"
        rounded="lg"
        border
      >
        <v-data-table-virtual
          :items="one.invoices"
          :loading="one.isLoading"
          height="348"
          sticky
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
      </v-card>
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
