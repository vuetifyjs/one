<template>
  <v-form
    v-if="banners.record"
    enctype="multipart/form-data"
    @submit.prevent="onClickSave"
  >
    <input
      name="id"
      type="hidden"
      :value="banners.record.id"
    >

    <input
      name="metadata[active]"
      type="hidden"
      :value="banners.record.metadata.active"
    >

    <input
      name="metadata[closable]"
      type="hidden"
      :value="banners.record.metadata.closable"
    >

    <input
      v-if="!banners.record.metadata.images.logo"
      name="metadata[images][logo]"
      type="hidden"
      :value="null"
    >

    <input
      v-if="!banners.record.metadata.images.bg"
      name="metadata[images][bg]"
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
          <v-col cols="6">
            <v-text-field
              v-model="banners.record.title"
              label="Title"
              name="title"
              required
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-model="banners.record.metadata.text"
              label="Text"
              name="metadata[text]"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="banners.record.metadata.subtext"
              label="Text"
              name="metadata[subtext]"
              required
            />
          </v-col>

          <v-col cols="4">
            <v-autocomplete
              v-model="banners.record.metadata.site"
              clearable
              :items="sites"
              label="Site(s)"
              multiple
            />

            <input
              v-for="site in banners.record.metadata.site"
              :key="site"
              name="metadata[site][]"
              type="hidden"
              :value="site"
            >
          </v-col>

          <v-col cols="4">
            <v-text-field
              append-inner-icon="$calendar"
              :items="sites"
              label="Start Date"
              :model-value="banners.record.metadata.start_date"
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
              :items="sites"
              label="End Date"
              :model-value="banners.record.metadata.end_date"
              name="metadata[end_date]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-date-picker v-model="stop" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              append-inner-icon="$eyeDropper"
              :items="sites"
              label="Color"
              :model-value="banners.record.metadata.color"
              name="metadata[color]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-color-picker v-model="banners.record.metadata.color" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              append-inner-icon="$eyeDropper"
              :items="sites"
              label="Link color"
              :model-value="banners.record.metadata.link_color"
              name="metadata[link_color]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-color-picker v-model="banners.record.metadata.link_color" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-number-input
              v-model="banners.record.metadata.height"
              clearable
              control-variant="stacked"
              label="Height"
              :min="0"
              name="metadata[height]"
              suffix="px"
              type="number"
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="banners.record.metadata.link_text"
              label="Link Text"
              name="metadata[link_text]"
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="banners.record.metadata.link"
              label="Link URL"
              name="metadata[link]"
            />
          </v-col>

          <v-col cols="2">
            <v-switch
              v-model="banners.record.metadata.closable"
              label="Closable"
            />
          </v-col>

          <v-col cols="6">
            <v-label>Logo</v-label>

            <div class="d-flex align-center mb-2">
              <div class="text-truncate text-caption py-1">
                {{ banners.record.metadata.images.logo?.url || 'Choose a file' }}
              </div>

              <VoBtn
                v-if="banners.record.metadata.images.logo?.url"
                class="ms-6"
                text="Clear"
                variant="outlined"
                @click="banners.record.metadata.images.logo = null"
              />
            </div>

            <v-file-input
              accept="image/*"
              label="Upload logo"
              name="metadata[images][logo]"
              @update:model-value="onUpdateLogo"
            />
          </v-col>

          <v-col cols="6">
            <v-label>Background</v-label>

            <div class="d-flex align-center mb-2">
              <div class="text-truncate text-caption py-1">
                {{ banners.record.metadata.images.bg?.url || 'Choose a file' }}
              </div>

              <VoBtn
                v-if="banners.record.metadata.images.bg?.url"
                class="ms-6"
                text="Clear"
                variant="outlined"
                @click="banners.record.metadata.images.bg = null"
              />
            </div>

            <v-row dense>
              <v-col>
                <v-file-input
                  accept="image/*"
                  label="Upload background"
                  name="metadata[images][bg]"
                  @update:model-value="onUpdateBg"
                />
              </v-col>
              <v-col cols="auto">
                <v-number-input
                  v-model="banners.record.metadata.bg_blur"
                  control-variant="stacked"
                  label="Blur"
                  :max="24"
                  :min="0"
                  :step="1"
                  suffix="px"
                />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>

      <v-layout class="pa-4 ma-4 border border-opacity-50 rounded">
        <v-responsive :height="(banners.record.metadata.height ?? 88) + 32">
          <v-label>Banner preview:</v-label>

          <VoNotificationsBanner
            class="overflow-hidden"
            demo
            rounded
          />
        </v-responsive>
      </v-layout>

      <v-divider />

      <template #actions>
        <VSwitch
          v-model="banners.record.metadata.active"
          class="ms-2"
          label="Active"
        />

        <v-spacer />

        <v-btn
          :disabled="isPristine || banners.isLoading"
          text="Cancel"
          @click="onClickCancel"
        />

        <v-btn
          :disabled="isPristine"
          :loading="banners.isLoading"
          text="Save"
          type="submit"
        />
      </template>
    </VoCard>
  </v-form>
</template>

<script lang="ts" setup>
  // Types
  import type { Banner } from '@/stores/banners'

  interface Props {
    isPristine?: boolean
    title: string
    prependIcon: string
  }

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  defineProps<Props>()

  const emit = defineEmits(['click:cancel', 'click:save'])

  const adapter = useDate()
  const banners = useBannersStore()
  const router = useRouter()

  const original = ref<Banner>()

  const sites = ['*', 'vbin', 'vplay', 'home', 'docs', 'server', 'dev', 'one']

  const start = computed({
    get: () => {
      const date = adapter.date(banners.record?.metadata.start_date)

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      banners.record!.metadata.start_date = adapter.toISO(value)
    },
  })

  const stop = computed({
    get: () => {
      const date = adapter.date(banners.record?.metadata.end_date)

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      banners.record!.metadata.end_date = adapter.toISO(value)
    },
  })

  function onClickCancel () {
    emit('click:cancel')
  }

  async function onClickSave (form: SubmitEvent) {
    emit('click:save', form)
  }

  function onUpdateLogo (_file: File | File[]) {
    const file = Array.isArray(_file) ? _file[0] : _file
    banners.record!.metadata.images.logo = file
      ? { url: URL.createObjectURL(file) } as any
      : { url: original.value!.metadata.images.logo?.url } as any
  }

  function onUpdateBg (_file: File | File[]) {
    const file = Array.isArray(_file) ? _file[0] : _file
    banners.record!.metadata.images.bg = file
      ? { url: URL.createObjectURL(file) } as any
      : { url: original.value!.metadata.images.bg?.url } as any
  }
</script>
