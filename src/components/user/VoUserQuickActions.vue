<template>
  <v-expand-transition>
    <div v-if="user.quickbar">
      <div class="d-flex align-center justify-center pa-1 ga-2">
        <v-btn
          class="text-caption"
          :color="user.colors.one"
          density="comfortable"
          flat
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
          class="text-caption"
          :color="user.colors.one"
          density="comfortable"
          flat
          href="https://bin.vuetifyjs.com"
          icon
          target="_blank"
        >
          <VoIconBin />

          <v-tooltip
            activator="parent"
            location="top"
            text="Vuetify Bin"
          />
        </v-btn>

        <v-btn
          class="text-caption"
          :color="user.colors.one"
          density="comfortable"
          flat
          href="https://issues.vuetifyjs.com"
          icon
          target="_blank"
        >
          <VoIconIssues />

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
  const user = useUserStore()
</script>
