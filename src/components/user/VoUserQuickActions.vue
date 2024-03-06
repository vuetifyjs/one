<template>
  <v-expand-transition>
    <div v-if="user.quickbar">
      <div class="d-flex align-center justify-center pa-1 ga-2">
        <v-btn
          :color="user.colors.one"
          class="text-caption"
          density="comfortable"
          href="https://play.vuetifyjs.com"
          icon="$vuetify-play"
          target="_blank"
        >
          <v-icon />

          <v-tooltip
            activator="parent"
            location="top"
            text="Vuetify Play"
          />
        </v-btn>

        <v-btn
          :color="user.colors.one"
          :icon="`svg:${mdiTrashCan}`"
          class="text-caption"
          density="comfortable"
          href="https://bin.vuetifyjs.com"
          target="_blank"
        >
          <v-icon />

          <v-tooltip
            activator="parent"
            location="top"
            text="Vuetify Bin"
          />
        </v-btn>

        <v-btn
          :color="user.colors.one"
          :icon="`svg:${mdiBug}`"
          class="text-caption"
          density="comfortable"
          href="https://issues.vuetifyjs.com"
          target="_blank"
        >
          <v-icon />

          <v-tooltip
            activator="parent"
            location="top"
            text="Vuetify Issues"
          />
        </v-btn>
      </div>
    </div>
  </v-expand-transition>
</template>

<script lang="ts" setup>
  // Stores
  import { useUserStore } from '@/store/user'

  // Icons
  import { mdiBug, mdiTrashCan } from '@mdi/js'

  const user = useUserStore()
</script>
