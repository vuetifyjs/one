<template>
  <v-form
    v-if="banners.record"
    enctype="multipart/form-data"
    @submit.prevent="onClickSave"
  >
    <input
      :value="banners.record.id"
      name="id"
      type="hidden"
    >

    <input
      :value="banners.record.metadata.active"
      name="metadata[active]"
      type="hidden"
    >

    <input
      v-if="!banners.record.metadata.images.logo"
      :value="null"
      name="metadata[images][logo]"
      type="hidden"
    >

    <input
      v-if="!banners.record.metadata.images.bg"
      :value="null"
      name="metadata[images][bg]"
      type="hidden"
    >

    <v-card
      :prepend-icon="prependIcon"
      :title="title"
    >
      <template #append>
        <VoBtn
          :prepend-icon="`svg:${mdiArrowLeft}`"
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
              :items="sites"
              label="Site(s)"
              clearable
              multiple
            />

            <input
              v-for="site in banners.record.metadata.site"
              :key="site"
              :value="site"
              name="metadata[site][]"
              type="hidden"
            >
          </v-col>

          <v-col cols="4">
            <v-text-field
              :items="sites"
              :model-value="banners.record.metadata.start_date"
              append-inner-icon="$calendar"
              label="Start Date"
              name="metadata[start_date]"
            >
              <v-menu :close-on-content-click="false" activator="parent">
                <v-date-picker v-model="start" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              :items="sites"
              :model-value="banners.record.metadata.end_date"
              append-inner-icon="$calendar"
              label="End Date"
              name="metadata[end_date]"
            >
              <v-menu :close-on-content-click="false" activator="parent">
                <v-date-picker v-model="stop" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              :items="sites"
              :model-value="banners.record.metadata.color"
              append-inner-icon="$eyeDropper"
              label="Color"
              name="metadata[color]"
            >
              <v-menu :close-on-content-click="false" activator="parent">
                <v-color-picker v-model="banners.record.metadata.color" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              :items="sites"
              :model-value="banners.record.metadata.link_color"
              append-inner-icon="$eyeDropper"
              label="Link color"
              name="metadata[link_color]"
            >
              <v-menu :close-on-content-click="false" activator="parent">
                <v-color-picker v-model="banners.record.metadata.link_color" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model.number="banners.record.metadata.height"
              label="Height"
              name="metadata[height]"
              type="number"
              clearable
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
              name="metadata[closable]"
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

            <v-file-input
              accept="image/*"
              label="Upload background"
              name="metadata[images][bg]"
              @update:model-value="onUpdateBg"
            />
          </v-col>
        </v-row>
      </v-card-text>

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
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
  // Composables
  import { useDate } from 'vuetify'
  import { useRouter } from 'vue-router'

  // Utilities
  import { definePage } from 'vue-router/auto'
  import { computed, ref } from 'vue'

  // Stores
  import { Banner, useBannersStore } from '@/stores/banners'

  // Icons
  import { mdiArrowLeft } from '@mdi/js'

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

  function onUpdateLogo (file: File[]) {
    banners.record!.metadata.images.logo = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.logo?.url } as any
  }

  function onUpdateBg (file: File[]) {
    banners.record!.metadata.images.bg = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.bg?.url } as any
  }
</script>
