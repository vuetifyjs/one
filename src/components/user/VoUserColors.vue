<template>
  <v-img
    :color="auth.user ? color : 'surface-light'"
    content-class="d-flex align-start justify-end pa-2"
    height="88"
    rounded="0"
    cover
    flat
  >
    <div class="d-flex">
      <VoBtn
        v-if="auth.isSubscriber"
        :active="colors"
        :icon="colors ? `svg:${mdiCheck}` : '$edit'"
        :variant="colors ? 'text' : 'plain'"
        color="inherit"
        @click="colors = !colors"
      />

      <v-expand-x-transition>
        <div v-show="colors" key="reset">
          <VoBtn
            :disabled="color === 'surface-light'"
            :icon="`svg:${mdiArrowULeftBottom}`"
            class="ms-1"
            color="inherit"
            variant="text"
            @click="reset"
          />
        </div>
      </v-expand-x-transition>
    </div>
  </v-img>

  <v-expand-transition>
    <v-color-picker
      v-if="colors"
      v-model="color"
      elevation="0"
      height="250"
      swatches-max-height="200"
      width="280"
      hide-canvas
      hide-inputs
      hide-sliders
      show-swatches
    />
  </v-expand-transition>
</template>

<script lang="ts" setup>
  // Utilities
  import { mdiArrowULeftBottom, mdiCheck } from '@mdi/js'
  import { shallowRef } from 'vue'

  // Stores
  import { useAuthStore } from '@/store/auth'

  const auth = useAuthStore()

  const color = shallowRef('surface-light')
  const colors = shallowRef(false)

  function reset () {
    color.value = 'surface-light'
  }
</script>
