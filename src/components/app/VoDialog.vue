<template>
  <v-dialog
    v-model="model"
    activator="parent"
    height="700"
    width="800"
  >
    <template #default="{ isActive }">
      <v-card
        :prepend-icon="prependIcon"
        :title="title"
        height="inherit"
        width="inherit"
      >
        <template v-if="$slots.prepend" #prepend>
          <slot name="prepend" />
        </template>

        <v-divider class="mt-4" />

        <slot />

        <template #append>
          <slot name="append" />

          <v-btn
            density="comfortable"
            icon="$close"
            size="small"
            variant="text"
            @click="model = !model"
          />
        </template>

        <template v-if="$slots.actions" #actions>
          <slot :is-active="isActive" name="actions" />
        </template>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  interface Props {
    prependIcon: string
    title: string
  }

  defineProps<Props>()

  const model = defineModel('modelValue', { type: Boolean })
</script>
