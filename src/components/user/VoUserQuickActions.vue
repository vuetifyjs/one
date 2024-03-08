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
          :icon="vbin"
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
          :icon="`svg:${mdiSpider}`"
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
  import { useUserStore } from '@/stores/user'

  // Icons
  import { mdiSpider } from '@mdi/js'

  const user = useUserStore()

  const vbin = [
    ['M18.9112 5.03206L3.68692 8.88953C3.68692 8.88953 2.00252 6.21666 2 6.21428C2.02517 6.20794 18.6159 2.00476 18.6394 2L18.8944 4.8489L18.9095 5.01937L18.9112 5.03285V5.03206Z', 0.6],
    ['M19.4556 10.9994C19.4556 10.9994 7.06082 14.1417 7.05915 14.1386L5.3739 11.4641C5.41836 11.453 18.4582 8.14817 18.4993 8.13945L19.1838 7.9658L19.4556 10.9994Z', 1],
    'M20 17.0652C19.9916 17.0675 14.6826 18.4123 14.6742 18.4147C14.6994 17.3633 14.3353 16.3579 13.712 15.5563L19.7274 14.0331L20 17.066V17.0652Z',
    ['M12.353 16.0368C9.07567 12.843 3.90082 17.0493 6.66818 20.5975C9.94136 24.3844 15.773 19.6984 12.353 16.0368ZM11.1267 19.4129C10.2224 20.7664 7.79139 20.1099 7.82746 18.4686C8.04976 15.4897 12.7112 16.8495 11.1267 19.4129Z', 0.6],
  ] as any
</script>
