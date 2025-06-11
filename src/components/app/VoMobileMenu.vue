<template>
  <v-menu
    v-model="mobileMenu"
    :close-on-content-click="false"
    :max-height="500"
    :min-width="300"
  >
    <template #activator="{ props }">
      <slot name="activator" v-bind="props">
        <v-btn v-bind="props" :icon="`svg:${mdiDotsVertical}`" size="small" />
      </slot>
    </template>

    <v-card class="pa-4">
      <template v-if="slots.prepend">
        <div class="mb-3">
          <slot name="prepend" />
        </div>
      </template>

      <template v-if="slots.title">
        <v-divider v-if="slots.prepend" class="mb-3" />
        <div class="text-h6 mb-3">
          <slot name="title" />
        </div>
      </template>

      <slot v-if="slots.default" name="default" />

      <template v-if="slots.extension">
        <div class="mt-2">
          <slot name="extension" />
        </div>
      </template>

      <template v-if="slots.append">
        <v-divider class="my-3" />
        <div class="mt-2">
          <slot name="append" />
        </div>
      </template>
    </v-card>
  </v-menu>
</template>

<script lang="ts" setup>
  import { mdiDotsVertical } from '@mdi/js'

  const mobileMenu = defineModel<boolean>()
  const slots = defineSlots<{
    default?: () => void
    prepend?: () => void
    title?: () => void
    extension?: () => void
    append?: () => void
    activator?: (props: Record<string, any>) => void
  }>()
</script>
