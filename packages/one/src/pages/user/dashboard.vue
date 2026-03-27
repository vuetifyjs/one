<template>
  <vo-app-bar logo="vone">
    <template #prepend-fixed>
      <v-app-bar-nav-icon v-if="mobile" @click="drawer = !drawer" />
    </template>

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

  <v-navigation-drawer
    v-model="drawer"
    :permanent="!mobile"
    :temporary="mobile"
    width="280"
  >
    <v-list
      v-model:selected="selected"
      class="pa-4"
      density="compact"
      mandatory
      nav
    >
      <v-list-item
        v-for="t in tabs"
        :key="t.value"
        border
        class="mb-2"
        :prepend-icon="`svg:${t.icon}`"
        rounded="lg"
        :title="t.title"
        :value="t.value"
      />
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-container class="py-8" max-width="1200">
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
    </v-container>
  </v-main>

  <vo-social-footer app order="-1" />
</template>

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
    mdiMenu,
  } from '@mdi/js'
  import { ECOSYSTEM_ACTIONS } from '@/composables/ecosystem'

  const { mobile } = useDisplay()
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
  const drawer = shallowRef(!mobile.value)

  const selected = computed({
    get: () => [tab.value],
    set: (val: string[]) => {
      if (val.length) tab.value = val[0]
    },
  })

  watch(() => route.query, () => {
    tab.value = resolve()
  })

  watch(tab, value => {
    if (route.query.tab === value) return

    router.replace({ query: { tab: value } })

    if (mobile.value) drawer.value = false
  })
</script>
