<template>
  <v-card>
    <v-toolbar :title="title">
      <template v-if="$slots.prepend || prependIcon" #prepend>
        <v-icon :icon="prependIcon" />

        <slot name="prepend" />
      </template>

      <slot name="toolbar" />

      <template v-if="$slots.append" #append>
        <slot name="append" />
      </template>
    </v-toolbar>

    <template v-if="$slots.default">
      <v-divider />

      <slot />
    </template>

    <template v-if="$slots.actions">
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
  // Types
  interface Props {
    prependIcon?: string
    title: string
  }

  defineProps<Props>()
</script>
