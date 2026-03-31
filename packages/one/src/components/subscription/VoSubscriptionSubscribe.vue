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

  <v-row>
    <v-col
      v-for="(plan, i) in plans"
      :key="i"
      cols="12"
      lg="4"
    >
      <v-card
        :border="type === plan.type ? 'sm primary opacity-50' : 'sm'"
        class="pa-8 d-flex flex-column mx-auto"
        :color="type === plan.type ? 'primary' : undefined"
        :disabled="plan.type === 'team' && disableTeam"
        flat
        height="500"
        max-width="450"
        rounded="xl"
        :variant="type === plan.type ? 'tonal' : 'flat'"
        @click="!plan.isCustom && (type = plan.type)"
      >
        <p class="mb-4 font-weight-bold">{{ plan.title }}</p>

        <p class="text-subtitle-2 pb-3">
          {{ plan.subtitle }}
        </p>

        <div class="text-h4 mb-4 font-weight-bold">
          {{ plan.isCustom ? 'Custom' : '$' + prices[plan.type][interval] }}
        </div>

        <v-switch
          v-if="!plan.isCustom"
          v-model="snips"
          class="mb-2"
          color="primary"
          density="compact"
          hide-details
          inset
          label="Add Snips"
          @click.stop
        />

        <v-btn
          class="mb-5 text-none mx-auto"
          :color="plan.isCustom ? 'surface-variant' : 'primary'"
          max-height="36"
          :text="plan.isCustom ? 'Contact Sales' : 'Select plan'"
          variant="flat"
          width="100%"
          @click.stop="handleSelectPlan(plan)"
        />

        <v-list-item
          v-for="(feature, index) in getFeatures(plan)"
          :key="index"
          class="px-0 text-body-2"
        >
          <template #prepend>
            <v-icon
              class="mr-2"
              :color="plan.isCustom ? 'default' : 'primary'"
              icon="mdi-check"
              size="small"
            />
          </template>

          <span v-html="feature" />
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  interface Plan {
    title: string
    subtitle: string
    type: 'solo' | 'team'
    features: string[]
    isCustom?: boolean
  }

  const interval = defineModel<'month' | 'year'>('interval', { default: 'year' })
  const type = defineModel<'solo' | 'team'>('type', { default: 'solo' })
  const snips = defineModel<boolean>('snips', { default: false })

  const team = useTeamStore()

  const disableTeam = computed(() => team.hasTeamAccess && !team.isTeamOwner)

  const prices = {
    solo: {
      month: '2.99 /month',
      year: '29.99 /year',
    },
    team: {
      month: '29.99 /month',
      year: '299.99 /year',
    },
  }

  const plans: Plan[] = [
    {
      title: 'Solo Developer',
      subtitle: 'Perfect for individual developers working on personal or freelance projects.',
      type: 'solo',
      features: [
        'Ad-free experience on all Vuetify properties',
        'Save and share across Play, Bin, Studio, Link',
        'Pinned pages and rail navigation in Documentation',
        'Vuetify MCP API key for AI-assisted development',
      ],
    },
    {
      title: 'Team Access',
      subtitle: 'Ideal for teams who want to collaborate and share resources across projects.',
      type: 'team',
      features: [
        'Invite up to 25 team members',
        'Ad-free experience on all Vuetify properties',
        'Save and share across Play, Bin, Studio, Link',
        'Pinned pages and rail navigation in Documentation',
        'Vuetify MCP API key for AI-assisted development',
      ],
    },
    {
      title: 'Enterprise',
      subtitle: 'Custom solutions for large organizations with specific requirements.',
      type: 'solo',
      features: [
        'Unlimited team members',
        'Priority support',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
      ],
      isCustom: true,
    },
  ]

  function getFeatures (plan: Plan) {
    const features = [...plan.features]

    if (snips.value && !plan.isCustom) {
      features.push('Access to <a href="https://snips.vuetifyjs.com" target="_blank">Snips</a> All Access')
    }

    return features
  }

  function handleSelectPlan (plan: Plan) {
    if (plan.isCustom) {
      window.open('mailto:support@vuetifyjs.com?subject=Enterprise%20Inquiry', '_blank')
      return
    }

    type.value = plan.type
  }
</script>