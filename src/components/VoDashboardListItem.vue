<template>
  <v-list-item
    title="Dashboard"
    :prepend-icon="`svg:${mdiViewDashboardOutline}`"
    slim
    link
  >
    <v-dialog
      activator="parent"
      height="95vh"
      width="95vw"
    >
      <v-card
        :prepend-icon="`svg:${mdiViewDashboardOutline}`"
        height="inherit"
        width="inherit"
      >
        <template #prepend>
          <v-icon size="x-large" />
        </template>

        <template #title>
          <div class="text-h4">Dashboard</div>
        </template>

        <v-container fluid>
          <v-row>
            <v-col cols="4">
              <v-card
                color="surface-variant"
                border
                rounded
                flat
                :prepend-icon="`svg:${mdiTrashCanOutline}`"
                title="Bins"
              >
                <v-container>
                  <v-row dense>
                    <v-col v-for="n in 6" :key="n" cols="4">
                      <v-chip
                        label
                        size="x-small"
                        text="Pinned Bin"
                        :prepend-icon="`svg:${mdiCircleSmall}`"
                        style="width: 100%;"
                      />
                    </v-col>
                  </v-row>
                </v-container>
                <v-data-table />
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script setup>
  import { mdiCircleSmall, mdiTrashCanOutline, mdiViewDashboardOutline } from '@mdi/js'
</script>
