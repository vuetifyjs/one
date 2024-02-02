<template>
  <v-list-item
    title="Notifications"
    :prepend-icon="`svg:${mdiInboxOutline}`"
    slim
    link
  >
    <template #prepend>
      <v-badge content="2" color="red">
        <v-icon />
      </v-badge>
    </template>
    <v-dialog
      activator="parent"
      max-width="500"
    >
      <v-card
        title="Notifications"
        :prepend-icon="`svg:${mdiInboxOutline}`"
        height="inherit"
        width="inherit"
      />
    </v-dialog>
  </v-list-item>
</template>

<script setup>
  import { mdiInboxOutline } from '@mdi/js'
</script>
