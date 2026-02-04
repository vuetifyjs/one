<template>
  <v-row>
    <v-col cols="12">
      <VoDialogSubheader
        text="View and download your store purchases."
        title="Download history"
      />

      <v-card
        border
        flat
        rounded="lg"
      >
        <v-data-table-virtual
          fixed-header
          :headers="headers"
          height="640"
          :items="downloads.all"
          :loading="downloads.isLoading"
        >
          <template #item.order_name="{ item }">
            #{{ item.order_name }}
          </template>

          <template #item.created_at="{ item }">
            {{ adapter.format(item.created_at, 'shortDate') }}
          </template>

          <template #item.download_items="{ item }">
            <div
              v-for="(download, i) in item.download_items"
              :key="i"
              class="text-truncate"
            >
              {{ download.name }}
            </div>
          </template>

          <template #item.download_url="{ item }">
            <v-btn
              color="medium-emphasis"
              :href="item.download_url"
              :icon="`svg:${mdiCloudDownload}`"
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
  // Icons
  import { mdiCloudDownload } from '@mdi/js'

  const adapter = useDate()
  const downloads = useDownloadsStore()

  const headers = [
    {
      title: 'Order ID',
      value: 'order_name',
    },
    {
      title: 'Items',
      value: 'download_items',
    },
    {
      title: 'Order date',
      value: 'created_at',
      align: 'end',
    },
    {
      title: 'Download',
      align: 'end',
      value: 'download_url',
    },
  ] as const

  onMounted(async () => {
    await downloads.index()
  })
</script>
