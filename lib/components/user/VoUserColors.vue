<template>
  <v-img
    :color="auth.user ? user.colors.one : 'surface-light'"
    content-class="d-flex align-start justify-end pa-2"
    height="88"
    rounded="0"
    cover
    flat
  >
    <div class="d-flex flex-grow-1 justify-end fill-height align-start">
      <VoUserBadges />

      <VoBtn
        v-if="auth.isSubscriber"
        :active="colors"
        :icon="colors ? `svg:${mdiCheck}` : '$edit'"
        :variant="colors ? 'text' : 'plain'"
        class="align-self-end"
        color="inherit"
        density="comfortable"
        title="Edit One Header Color"
        @click="colors = !colors"
      >
        <v-fade-transition leave-absolute>
          <v-icon :key="String(colors)" />
        </v-fade-transition>
      </VoBtn>

      <v-expand-x-transition>
        <div
          v-show="colors"
          key="reset"
          class="align-self-end"
        >
          <VoBtn
            :disabled="user.colors.one === 'surface-light'"
            :icon="`svg:${mdiArrowULeftBottom}`"
            class="ms-2 me-1"
            color="inherit"
            density="comfortable"
            title="Revert to Default"
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
      :model-value="user.colors.one !== 'surface-light' ? user.colors.one : undefined"
      elevation="0"
      height="250"
      rounded="0"
      swatches-max-height="200"
      width="278"
      hide-canvas
      hide-inputs
      hide-sliders
      show-swatches
      @update:model-value="user.colors.one = $event"
    />
  </v-expand-transition>
</template>

<script lang="ts" setup>
  // Utilities
  import { shallowRef } from 'vue'

  // Stores
  import { useAuthStore } from '@/stores/auth'
  import { useUserStore } from '@/stores/user'

  // Icons
  import { mdiArrowULeftBottom, mdiCheck } from '@mdi/js'

  const auth = useAuthStore()
  const user = useUserStore()

  const colors = shallowRef(false)

  function reset () {
    user.colors.one = 'surface-light'
  }
</script>
@/stores/auth@/stores/user
