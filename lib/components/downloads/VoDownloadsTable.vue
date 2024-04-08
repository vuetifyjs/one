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
        height="450"
        rounded="lg"
      >
        <v-data-table-virtual
          :items="downloads.downloads"
          :loading="downloads.isLoading"
          sticky
        >

          <template #item.pdf="{ item }">
            <v-btn
              :href="item.url"
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
  // Icons
  import { mdiFileDocument } from '@mdi/js'

  const downloads = useDownloadsStore()

  onMounted(async () => {
    await downloads.index()

    console.log(downloads.all)
  })
</script>
