<template>
  <v-list-item slim>
    <template v-if="$slots.prepend" #prepend>
      <slot name="prepend" />
    </template>

    <template v-if="$slots.title" #title>
      <slot name="title" />
    </template>

    <slot />

    <template v-if="$slots.append" #append>
      <slot name="append" />
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
  //
</script>
