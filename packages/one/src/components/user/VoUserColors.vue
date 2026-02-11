<template>
  <v-img
    :color="auth.user ? user.one.colors.primary : 'surface-light'"
    content-class="d-flex align-start justify-end pa-2"
    cover
    flat
    height="84"
    rounded="0"
  >
    <div class="d-flex flex-grow-1 justify-end fill-height align-start">
      <VoUserBadges />

      <VoUserPinnedEcosystem />

      <v-expand-x-transition>
        <div
          v-show="colors"
          key="reset"
          class="align-self-end"
        >
          <VoBtn
            class="ms-2 me-1"
            color="inherit"
            density="comfortable"
            :disabled="user.one.colors.primary === 'surface-light'"
            :icon="`svg:${mdiArrowULeftBottom}`"
            title="Revert to Default"
            variant="text"
            @click="reset"
          />
        </div>
      </v-expand-x-transition>

      <VoBtn
        v-if="one.isSubscriber"
        :active="colors"
        class="align-self-end"
        color="inherit"
        density="comfortable"
        :icon="colors ? `svg:${mdiCheck}` : '$edit'"
        title="Edit One Header Color"
        :variant="colors ? 'text' : 'plain'"
        @click="colors = !colors"
      >
        <v-fade-transition leave-absolute>
          <v-icon :key="String(colors)" />
        </v-fade-transition>
      </VoBtn>
    </div>
  </v-img>

  <v-expand-transition>
    <v-color-picker
      v-if="colors"
      elevation="0"
      height="250"
      hide-canvas
      hide-inputs
      hide-sliders
      :model-value="user.one.colors.primary !== 'surface-light' ? user.one.colors.primary : undefined"
      rounded="0"
      show-swatches
      swatches-max-height="200"
      width="278"
      @update:model-value="user.one.colors.primary = $event"
    />
  </v-expand-transition>
</template>

<script lang="ts" setup>
  // Icons
  import { mdiArrowULeftBottom, mdiCheck } from '@mdi/js'

  const auth = useAuthStore()
  const one = useOneStore()
  const user = useUserStore()

  const colors = shallowRef(false)

  function reset () {
    user.one.colors.primary = 'surface-light'
  }
</script>
