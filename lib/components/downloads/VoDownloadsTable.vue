<template>
  <v-row>
    <v-col cols="12">
      <VoDialogSubheader
        text="View and download your store purchase."
        title="Download history"
      />

      <v-card
        border
        flat
        min-height="640"
        rounded="lg"
      >
        <v-data-table-virtual
          :headers="headers"
          :items="downloads.all"
          :loading="downloads.isLoading"
          sticky
        >
          <template #item.order_name="{ item }">
            #{{ item.order_name }}
          </template>

          <template #item.created_at="{ item }">
            {{ adapter.format(item.created_at, 'fullDateWithWeekday') }}
          </template>

          <template #item.download_items="{ item }">
            <div v-for="(download, i) in item.download_items" :key="i">
              {{ download.name }}
            </div>
          </template>

          <template #item.download_url="{ item }">
            <v-btn
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
      title: 'Order date',
      value: 'created_at',
    },
    {
      title: 'Items',
      value: 'download_items',
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
