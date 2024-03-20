<template>
  <v-empty-state
    icon="$close"
    title="401 Not Authorized"
  >
    <template #media>
      <v-icon color="medium-emphasis" size="256" />
    </template>

    <template #headline>
      <div class="text-h1 mt-n6 mb-6">Warning</div>
    </template>

    <template #text>
      <p class="text-body-2 text-medium-emphasis">
        You are not authorized to view this page.
      </p>
    </template>
  </v-empty-state>
</template>

<script lang="ts" setup>
  definePage({
    meta: {
      guest: true,
    },
  })
</script>
