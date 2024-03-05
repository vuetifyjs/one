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
      <v-sheet
        class="align-center position-absolute ms-2 d-flex ga-2 pa-2"
        color="rgba(0,0,0,.36)"
        rounded="lg"
        style="left: 0;"
      >
        <v-tooltip
          v-if="auth.user?.isAdmin"
          location="bottom"
          text="Vuetify Administrator"
        >
          <template #activator="{ props: activatorProps }">
            <v-icon
              color="blue"
              icon="$vuetify"
              v-bind="activatorProps"
              size="16"
            />
          </template>
        </v-tooltip>

        <v-tooltip
          v-if="one.isSubscriber"
          location="bottom"
          text="Vuetify One Subscriber"
        >
          <template #activator="{ props: activatorProps }">
            <v-icon
              :icon="`svg:${mdiCrown}`"
              color="amber-darken-2"
              v-bind="activatorProps"
              size="16"
            />
          </template>
        </v-tooltip>

        <v-tooltip
          v-if="one.github"
          location="bottom"
          text="GitHub Sponsor"
        >
          <template #activator="{ props: activatorProps }">
            <v-icon
              :icon="`svg:${mdiGithub}`"
              color="medium-emphasis"
              v-bind="activatorProps"
              size="16"
            />
          </template>
        </v-tooltip>

        <v-tooltip
          v-if="one.discord"
          location="bottom"
          text="Discord Subscriber"
        >
          <template #activator="{ props: activatorProps }">
            <v-icon
              :icon="`svg:${mdiDiscord}`"
              color="medium-emphasis"
              v-bind="activatorProps"
              size="16"
            />
          </template>
        </v-tooltip>
      </v-sheet>

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
  import { mdiArrowULeftBottom, mdiCheck, mdiCrown, mdiDiscord, mdiGithub } from '@mdi/js'
  import { shallowRef } from 'vue'

  // Stores
  import { useAuthStore } from '@/store/auth'
  import { useOneStore } from '@/store/one'
  import { useUserStore } from '@/store/user'

  const auth = useAuthStore()
  const one = useOneStore()
  const user = useUserStore()

  const colors = shallowRef(false)

  function reset () {
    user.colors.one = 'surface-light'
  }
</script>
