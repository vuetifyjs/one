<template>
  <v-switch
    :model-value="user?.isAdmin"
    @update:model-value="onUpdate"
  />
</template>

<script lang="ts" setup>
  // Types
  import type { User } from '@/stores/auth'

  defineProps<{
    user: User | null
  }>()

  const emit = defineEmits(['update:modelValue'])

  function onUpdate (val: boolean | null) {
    emit('update:modelValue', val)
  }
</script>
