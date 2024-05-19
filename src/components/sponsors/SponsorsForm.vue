<template>
  <v-form
    v-if="sponsors.record"
    enctype="multipart/form-data"
    @submit.prevent="onClickSave"
  >
    <input
      name="id"
      type="hidden"
      :value="sponsors.record.id"
    >

    <input
      name="title"
      type="hidden"
      :value="sponsors.record.metadata.name"
    >

    <input
      name="metadata[active]"
      type="hidden"
      :value="sponsors.record.metadata.active"
    >

    <input
      v-if="!sponsors.record.metadata.logodark"
      name="metadata[logodark]"
      type="hidden"
      :value="null"
    >

    <input
      v-if="!sponsors.record.metadata.logolight"
      name="metadata[logolight]"
      type="hidden"
      :value="null"
    >

    <VoCard :prepend-icon="prependIcon" :title="title">
      <template #append>
        <VoBtn
          prepend-icon="mdi-arrow-left"
          text="Go Back"
          @click="router.go(-1)"
        />
      </template>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="sponsors.record.metadata.name"
              label="Name"
              name="metadata[name]"
              required
            />
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="sponsors.record.metadata.source"
              clearable
              :items="sources"
              label="Source"
              name="metadata[source]"
            />
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="sponsors.record.metadata.level"
              clearable
              item-title="value"
              :items="levels"
              label="Level"
              name="metadata[level]"
              return-object
            />
          </v-col>

          <v-col cols="3">
            <v-number-input
              label="Tier"
              :model-value="Number(sponsors.record.metadata.tier)"
              name="metadata[tier]"
              required
              @update:model-value="sponsors.record.metadata.tier = String($event)"
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              append-inner-icon="$calendar"
              autocomplete="off"
              clearable
              :items="sites"
              label="Start Date"
              :model-value="sponsors.record.metadata.start_date"
              name="metadata[start_date]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-date-picker v-model="start" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              append-inner-icon="$calendar"
              autocomplete="off"
              clearable
              :items="sites"
              label="End Date"
              :model-value="sponsors.record.metadata.end_date"
              name="metadata[end_date]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-date-picker v-model="stop" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="sponsors.record.metadata.href"
              label="Link URL"
              name="metadata[href]"
            />
          </v-col>

          <v-col cols="6">
            <v-label>Logo dark</v-label>

            <div class="d-flex align-center mb-2">
              <v-img
                color="surface-variant"
                max-height="56"
                rounded
                :src="sponsors.record.metadata.logodark?.url"
                width="212"
              />

              <VoBtn
                v-if="sponsors.record.metadata.logodark?.url"
                class="ms-6 align-self-end"
                text="Clear"
                variant="outlined"
                @click="sponsors.record.metadata.logodark = null"
              />
            </div>

            <v-file-input
              accept="image/*"
              label="Upload logo"
              name="metadata[logodark]"
              @update:model-value="onUpdateLogoDark"
            />
          </v-col>

          <v-col cols="6">
            <v-label>Logo light</v-label>

            <div class="d-flex align-center mb-2">
              <v-img
                color="surface-variant"
                max-height="56"
                rounded
                :src="sponsors.record.metadata.logolight?.url"
                width="212"
              />

              <VoBtn
                v-if="sponsors.record.metadata.logolight?.url"
                class="ms-6 align-self-end"
                text="Clear"
                variant="outlined"
                @click="sponsors.record.metadata.logolight = null"
              />
            </div>

            <v-file-input
              accept="image/*"
              label="Upload background"
              name="metadata[logolight]"
              @update:model-value="onUpdateLogoLight"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <template #actions>
        <VSwitch
          v-model="sponsors.record.metadata.active"
          class="ms-2"
          label="Active"
        />

        <v-spacer />

        <v-btn
          :disabled="isPristine || sponsors.isLoading"
          text="Cancel"
          @click="onClickCancel"
        />

        <v-btn
          :disabled="isPristine"
          :loading="sponsors.isLoading"
          text="Save"
          type="submit"
        />
      </template>
    </VoCard>
  </v-form>
</template>

<script lang="ts" setup>
  // Types
  import type { Sponsor } from '@/stores/sponsors'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  defineProps<{
    isPristine?: boolean
    title: string
    prependIcon: string
  }>()

  const emit = defineEmits(['click:cancel', 'click:save'])

  // const levels = [
  //   'None',
  //   'Special - $2,000',
  //   'Diamond - $1,500',
  //   'Platinum - $500',
  //   'Gold - $250',
  //   'Affiliate',
  //   'Service',
  // ]
  const levels = [
    { key: '', value: 'None' },
    { key: '1', value: 'Special - $2,000' },
    { key: '2', value: 'Diamond - $1,500' },
    { key: '3', value: 'Platinum - $500' },
    { key: '4', value: 'Gold - $250' },
    { key: '5', value: 'Affiliate' },
    { key: '6', value: 'Service' },
  ]
  const sources = [
    'None',
    'GitHub',
    'Patreon',
    'Open Collective',
    'Affiliate',
    'Service Sponsor',
    'Other (Special)',
  ]

  const adapter = useDate()
  const sponsors = useSponsorsStore()
  const router = useRouter()

  const original = ref<Sponsor>()

  const sites = ['*', 'vbin', 'vplay', 'home', 'docs', 'server', 'dev', 'one']

  const start = computed({
    get: () => {
      const date = adapter.date(sponsors.record?.metadata.start_date)

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      sponsors.record!.metadata.start_date = adapter.toISO(value)
    },
  })

  const stop = computed({
    get: () => {
      const date = adapter.date(sponsors.record?.metadata.end_date)

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      sponsors.record!.metadata.end_date = adapter.toISO(value)
    },
  })

  function onClickCancel () {
    emit('click:cancel')
  }

  async function onClickSave (form: SubmitEvent) {
    emit('click:save', form)
  }

  function onUpdateLogoDark (_file: File | File[]) {
    const file = Array.isArray(_file) ? _file[0] : _file
    sponsors.record!.metadata.logodark = file
      ? { url: URL.createObjectURL(file) } as any
      : { url: original.value!.metadata.logodark?.url } as any
  }

  function onUpdateLogoLight (_file: File | File[]) {
    const file = Array.isArray(_file) ? _file[0] : _file
    sponsors.record!.metadata.logolight = file
      ? { url: URL.createObjectURL(file) } as any
      : { url: original.value!.metadata.logolight?.url } as any
  }
</script>
