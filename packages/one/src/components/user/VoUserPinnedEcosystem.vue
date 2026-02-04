<template>
  <v-sheet
    v-if="user.one.quicklinks && pinned.length > 0"
    class="align-center position-absolute d-flex ga-2 pa-2 me-2"
    color="rgba(0,0,0,.54)"
    rounded="lg"
    style="right: 0; top: 8px;"
  >
    <v-hover
      v-for="action in pinned"
      :key="action.id"
    >
      <template #default="{ isHovering, props: hoverProps }">
        <a
          v-tooltip:start="action.name"
          class="d-inline-flex"
          :href="action.href"
          target="_blank"
          v-bind="hoverProps"
        >
          <v-icon
            :color="isHovering ? 'primary' : 'white'"
            :icon="action.icon"
            size="16"
          />
        </a>
      </template>
    </v-hover>
  </v-sheet>
</template>

<script lang="ts" setup>
  import { useEcosystem } from '@/composables/ecosystem'

  const user = useUserStore()
  const { pinned } = useEcosystem()
</script>
