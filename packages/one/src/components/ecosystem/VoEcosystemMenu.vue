<template>
  <v-card border min-width="240" rounded="lg">
    <v-list density="compact" nav>
      <v-list-item
        v-for="action in actions"
        :key="action.id"
        v-tooltip:start="action.description"
        :href="action.href"
        :prepend-icon="action.icon"
        rounded="lg"
        target="_blank"
        :title="action.name"
      >
        <template v-if="auth.user" #append>
          <v-btn
            v-tooltip:top="isPinned(action.id) ? 'Unpin' : 'Pin'"
            :icon="`svg:${isPinned(action.id) ? mdiPin : mdiPinOutline}`"
            size="x-small"
            variant="text"
            @click.prevent.stop="togglePin(action.id)"
          />
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script lang="ts" setup>
  import { mdiPin, mdiPinOutline } from '@mdi/js'
  import { useEcosystem } from '@/composables/ecosystem'

  const auth = useAuthStore()
  const { actions, isPinned, togglePin } = useEcosystem()
</script>
