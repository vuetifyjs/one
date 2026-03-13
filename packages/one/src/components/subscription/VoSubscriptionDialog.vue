<script lang="ts" setup>
  // Icons
  import { mdiCreditCard } from '@mdi/js'

  const dialog = defineModel('modelValue', { type: Boolean })

  const one = useOneStore()
  const query = useQuery<{ one: string, team: string }>()

  watch(dialog, async val => {
    if (!val || !one.isSubscriber) {
      if (!val) one.resetQuery()

      return
    }

    one.subscriptionInfo()
  })

  watch(query, async () => {
    if (!one.sessionId && !['subscribe', 'status'].includes(query.value.one)) return
    if (query.value.team) return

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
</script>

<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiCreditCard}`"
    title="Subscriptions"
  >
    <v-layout>
      <v-main scrollable>
        <VoSubscriptionPanel />
      </v-main>
    </v-layout>
  </VoDialog>
</template>
