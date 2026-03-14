<script lang="ts" setup>
  // Icons
  import {
    mdiAccountGroup,
    mdiArrowLeft,
    mdiCog,
    mdiCreditCard,
    mdiHandHeart,
    mdiHistory,
    mdiKey,
  } from '@mdi/js'
  import { ECOSYSTEM_ACTIONS } from '@/composables/ecosystem'

  const route = useRoute()
  const router = useRouter()

  function resolveReferrer () {
    const from = route.query.from as string
    if (from) return ECOSYSTEM_ACTIONS.find(a => a.id === from)

    if (!document.referrer) return undefined

    try {
      const hostname = new URL(document.referrer).hostname
      return ECOSYSTEM_ACTIONS.find(a => new URL(a.href).hostname === hostname)
    } catch {
      return undefined
    }
  }

  const referrer = shallowRef(resolveReferrer())

  const LEGACY_MAP: Record<string, string> = {
    team: 'team',
    sponsorships: 'sponsorships',
    subscribe: 'subscriptions',
    status: 'subscriptions',
    mcp: 'mcp',
    settings: 'settings',
  }

  const tabs = [
    { value: 'activity', title: 'Recent Activity', icon: mdiHistory },
    { value: 'subscriptions', title: 'Subscriptions', icon: mdiCreditCard },
    { value: 'sponsorships', title: 'Sponsorships', icon: mdiHandHeart },
    { value: 'team', title: 'Team', icon: mdiAccountGroup },
    { value: 'mcp', title: 'MCP API Key', icon: mdiKey },
    { value: 'settings', title: 'Settings', icon: mdiCog },
  ]

  function resolve () {
    const tab = route.query.tab as string
    if (tab && tabs.some(t => t.value === tab)) return tab

    const legacy = route.query.one as string
    if (legacy && LEGACY_MAP[legacy]) return LEGACY_MAP[legacy]

    return 'activity'
  }

  const tab = shallowRef(resolve())

  watch(() => route.query, () => {
    tab.value = resolve()
  })

  watch(tab, value => {
    if (route.query.tab === value) return

    router.replace({ query: { tab: value } })
  })


</script>

<template>
  <vo-app-bar logo="vone">
    <template v-if="referrer" #prepend>
      <v-btn
        class="text-none ms-2"
        :href="referrer.href"
        :prepend-icon="`svg:${mdiArrowLeft}`"
        rounded="lg"
        slim
        :text="`Return to ${referrer.name}`"
        variant="tonal"
      >
        <template #append>
          <v-img
            :src="`https://cdn.vuetifyjs.com/docs/images/one/logos/v${referrer.id}.svg`"
            width="18"
          />
        </template>
      </v-btn>
    </template>
  </vo-app-bar>

  <vo-notifications-banner />

  <v-main>
    <v-container class="py-8" max-width="1200">
      <v-row>
        <v-col cols="auto">
          <v-tabs v-model="tab" direction="vertical">
            <v-tab
              v-for="t in tabs"
              :key="t.value"
              :prepend-icon="`svg:${t.icon}`"
              :text="t.title"
              :value="t.value"
            />
          </v-tabs>
        </v-col>

        <v-divider vertical />

        <v-col>
          <v-window v-model="tab">
            <v-window-item value="activity">
              <VoActivityPanel />
            </v-window-item>

            <v-window-item value="subscriptions">
              <VoSubscriptionPanel />
            </v-window-item>

            <v-window-item value="sponsorships">
              <VoSponsorshipsPanel />
            </v-window-item>

            <v-window-item value="team">
              <VoTeamPanel />
            </v-window-item>

            <v-window-item value="mcp">
              <VoMcpPanel />
            </v-window-item>

            <v-window-item value="settings">
              <VoSettingsPanel />
            </v-window-item>
          </v-window>
        </v-col>
      </v-row>
    </v-container>
  </v-main>

  <vo-social-footer app />
</template>
