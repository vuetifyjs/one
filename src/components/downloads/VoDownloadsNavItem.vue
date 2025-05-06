<template>
  <VoListItem
    :active="dialog"
    link
    :prepend-icon="`svg:${mdiTrayArrowDown}`"
    title="Downloads"
  >
    <VoDialog
      v-model="dialog"
      :prepend-icon="`svg:${mdiTrayArrowDown}`"
      title="Downloads"
    >
      <v-layout>
        <v-main scrollable>
          <div class="px-3">
            <v-card-text>
              <VoDownloadsTable />
            </v-card-text>
          </div>
        </v-main>
      </v-layout>
    </VoDialog>
  </VoListItem>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiTrayArrowDown } from '@mdi/js'

  const dialog = shallowRef(false)
</script>
