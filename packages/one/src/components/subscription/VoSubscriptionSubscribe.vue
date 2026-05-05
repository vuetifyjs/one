<template>
  <v-responsive
    class="text-center mx-auto mb-6"
    max-width="700"
  >
    <p class="font-weight-medium text-primary">Pricing</p>

    <h1 class="text-h4 font-weight-bold mb-4">
      Pricing plans for teams of all sizes
    </h1>

    <p class="text-subtitle-1 text-medium-emphasis">
      Unlock premium features across the entire Vuetify ecosystem.
      From solo developers to enterprise teams, we have a plan that fits your needs.
    </p>
  </v-responsive>

  <div class="d-flex justify-center mb-6 mx-auto">
    <v-sheet
      class="pa-1"
      rounded="xl"
    >
      <v-btn
        class="mr-1 text-none"
        :color="interval === 'month' ? 'primary' : 'default'"
        rounded
        text="Monthly"
        variant="flat"
        @click="interval = 'month'"
      />

      <v-btn
        class="text-none"
        :color="interval === 'year' ? 'primary' : 'default'"
        rounded
        text="Annually"
        variant="flat"
        @click="interval = 'year'"
      />
    </v-sheet>
  </div>

  <v-row justify="center">
    <v-col
      v-for="(plan, i) in plans"
      :key="i"
      cols="12"
      md="6"
    >
      <v-card
        :border="type === plan.type ? 'sm primary opacity-50' : 'sm'"
        class="px-3 pb-4 d-flex flex-column mx-auto h-100"
        :color="type === plan.type ? 'primary' : undefined"
        :disabled="plan.type === 'team' && disableTeam"
        flat
        max-width="450"
        rounded="xl"
        :variant="type === plan.type ? 'tonal' : 'flat'"
        @click="type = plan.type"
      >
        <h2 class="mb-1 font-weight-bold">{{ plan.title }}</h2>

        <p class="text-subtitle-2 pb-3">
          {{ plan.subtitle }}
        </p>

        <div class="text-h4 mb-4 font-weight-bold">
          ${{ prices[plan.type][interval] }}
        </div>

        <v-btn
          class="mb-5 text-none mx-auto"
          color="primary-darken-2"
          max-height="36"
          :text="type === plan.type ? 'Selected' : 'Select plan'"
          :variant="type === plan.type ? 'flat' : 'tonal'"
          width="100%"
          @click.stop="type = plan.type"
        />

        <v-list-item
          v-for="(feature, index) in plan.features"
          :key="index"
          class="px-0 text-body-2"
        >
          <template #prepend>
            <v-icon
              :color="feature.new ? 'success' : feature.soon ? 'warning' : 'info-lighten-3'"
              :icon="feature.new ? 'mdi-new-box' : feature.soon ? 'mdi-clock-outline' : 'mdi-check-circle'"
              size="20"
            />
          </template>

          <span class="text-body-2">
            <template v-for="(part, p) in toParts(feature.text)" :key="p">
              <a
                v-if="typeof part !== 'string'"
                :href="part.href"
                rel="noopener noreferrer"
                target="_blank"
                @click.stop
              >{{ part.label }}</a>

              <template v-else>{{ part }}</template>
            </template>
          </span>

          <template v-if="feature.soon" #append>
            <v-chip
              color="warning"
              size="x-small"
              text="Soon"
              variant="tonal"
            />
          </template>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="interval === 'month'" justify="center">
    <v-col
      class="d-flex justify-center"
      cols="12"
      lg="8"
    >
      <v-card
        border="sm"
        class="pa-4 d-flex align-center"
        flat
        rounded="xl"
        @click="snips = !snips"
      >
        <div>
          <div class="text-subtitle-2 font-weight-bold">Add Snips</div>

          <div class="text-caption text-medium-emphasis">
            Access to all premium code snippets — ${{ prices.snips[type] }}/month
          </div>
        </div>

        <v-switch
          v-model="snips"
          class="ml-4 flex-grow-0"
          color="primary"
          density="compact"
          hide-details
          inset
        />
      </v-card>
    </v-col>
  </v-row>

  <v-responsive class="mx-auto mt-8" max-width="700">
    <v-label class="font-weight-black">Up Next</v-label>

    <div class="mb-3 text-caption text-medium-emphasis">
      The following features are in development and coming soon:
    </div>

    <v-list class="py-0" density="compact" :lines="false" nav>
      <VoListItem
        v-for="(item, i) in upnext"
        :key="i"
        class="mb-0"
        :prepend-icon="`svg:${mdiRocketOutline}`"
      >
        <template #prepend>
          <v-icon class="mx-n2" size="small" />
        </template>

        <template #title>{{ item }}</template>
      </VoListItem>
    </v-list>
  </v-responsive>
</template>

<script lang="ts" setup>
  import { mdiRocketOutline } from '@mdi/js'

  interface Link {
    href: string
    label: string
  }

  type TextPart = string | Link

  interface Feature {
    text: string | TextPart[]
    soon?: boolean
    new?: boolean
  }

  interface Plan {
    title: string
    subtitle: string
    type: 'solo' | 'team'
    features: Feature[]
  }

  const interval = defineModel<'month' | 'year'>('interval', { default: 'year' })
  const type = defineModel<'solo' | 'team'>('type', { default: 'solo' })
  const snips = defineModel<boolean>('snips', { default: false })

  const team = useTeamStore()

  const disableTeam = computed(() => !team.isTeamOwner && team.hasTeamAccess)

  function toParts (text: string | TextPart[]): TextPart[] {
    return typeof text === 'string' ? [text] : text
  }

  const upnext = [
    'Embeddable playgrounds for your own documentation',
    'Team shared workspaces for bins and playgrounds',
    'Real-time collaboration on bins and playgrounds',
  ]

  const prices = {
    solo: {
      month: '2.99 /month',
      year: '29.99 /year',
    },
    team: {
      month: '29.99 /month',
      year: '299.99 /year',
    },
    snips: {
      solo: '19.99',
      team: '49.99',
    },
  }

  watch(interval, val => {
    if (val === 'year') snips.value = false
  })

  const plans: Plan[] = [
    {
      title: 'Solo Developer',
      subtitle: 'Perfect for individual developers working on personal or freelance projects.',
      type: 'solo',
      features: [
        { text: 'Ad-free experience across all Vuetify properties' },
        { text: 'Private playgrounds, bins, links, and studios with cloud sync' },
        { text: 'Premium documentation features (pinned nav, rail menu, copy page as markdown)' },
        { text: 'Early access to new tools and features' },
        { text: 'Vuetify MCP API (access to your one data anywhere that supports MCP)', new: true },
        { text: 'Share live updates on Bins and Playgrounds', soon: true },
        { text: 'Embed playgrounds in your own documentation', soon: true },
      ],
    },
    {
      title: 'Team Access',
      subtitle: 'Ideal for teams who want to collaborate and share resources across projects.',
      type: 'team',
      features: [
        { text: 'Everything in Solo, for up to 25 members' },
        { text: 'Centralized team billing and member management' },
        { text: 'Shared playgrounds and code snippets' },
        { text: 'Team shared Private Bins and Playgrounds', soon: true },
        { text: 'Usage analytics dashboard', soon: true },
      ],
    },
  ]
</script>
