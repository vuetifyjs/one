<template>
  <v-layout class="ma-4" full-height>
    <VoNotificationsBanner class="overflow-hidden" demo rounded />

    <v-main v-if="banners.record" class="mt-4">
      <v-form
        enctype="multipart/form-data"
        @submit.prevent="onClickSave"
      >
        <v-card
          prepend-icon="$edit"
          title="Edit Banner"
        >
          <v-divider />

          <v-card-text>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="banners.record.title"
                  label="Title"
                  name="title"
                  required
                />
              </v-col>

              <v-col cols="3">
                <v-text-field
                  v-model="banners.record.slug"
                  label="Slug"
                  name="slug"
                  required
                />
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="banners.record.metadata.text"
                  label="Text"
                  name="metadata.text"
                  required
                />
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="banners.record.metadata.subtext"
                  label="Text"
                  name="metadata.subtext"
                  required
                />
              </v-col>

              <v-col cols="4">
                <v-autocomplete
                  v-model="banners.record.metadata.site"
                  :items="sites"
                  label="Site(s)"
                  name="metadata.site"
                  multiple
                />
              </v-col>

              <v-col cols="4">
                <v-text-field
                  :items="sites"
                  :model-value="banners.record.metadata.start_date"
                  append-inner-icon="$calendar"
                  label="Start Date"
                  name="metadata.start_date"
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
                  label="Start Date"
                  name="metadata.end_date"
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
                  name="metadata.color"
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
                  name="metadata.link_color"
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
                  name="metadata.height"
                  type="number"
                />
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="banners.record.metadata.link_text"
                  label="Link Text"
                  name="metadata.link_text"
                />
              </v-col>

              <v-col cols="4">
                <v-text-field
                  v-model="banners.record.metadata.link"
                  label="Link URL"
                  name="metadata.link"
                />
              </v-col>

              <v-col cols="2">
                <v-switch
                  v-model="banners.record.metadata.closable"
                  label="Closable"
                  name="metadata.closable"
                />
              </v-col>

              <v-col cols="6">
                <v-file-input
                  accept="image/*"
                  label="Upload logo"
                  name="metadata.images.logo"
                  @update:model-value="onUpdateLogo"
                />
              </v-col>

              <v-col cols="6">
                <v-file-input
                  accept="image/*"
                  label="Upload background"
                  name="metadata.images.bg"
                  @update:model-value="onUpdateBg"
                />
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider />

          <template #actions>
            <v-spacer />

            <v-btn :disabled="isPristine" text="Cancel" @click="onClickCancel" />

            <v-btn text="Save" type="submit" />
          </template>
        </v-card>
      </v-form>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
  // Composables
  import { useDate } from 'vuetify'
  import { useParams } from '@/composables/route'

  // Utilities
  import { definePage, onBeforeRouteLeave } from 'vue-router/auto'
  import { computed, onMounted, ref } from 'vue'

  // Stores
  import { Banner, useBannersStore } from '@/stores/banners'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const adapter = useDate()
  const banners = useBannersStore()
  const params = useParams<{ slug: string }>()

  const original = ref<Banner>()
  const isPristine = computed(() => {
    return JSON.stringify(banners.record) === JSON.stringify(original.value)
  })

  const sites = ['*', 'vbin', 'vplay', 'home', 'docs', 'server', 'dev', 'one']

  const start = computed({
    get: () => {
      const date = adapter.date(banners.record?.metadata.start_date)

      return adapter.parseISO(adapter.toISO(date))
    },
    set: (value: string) => {
      banners.record!.metadata.start_date = adapter.toISO(value)
    },
  })

  const stop = computed({
    get: () => {
      const date = adapter.date(banners.record?.metadata.end_date)

      return adapter.parseISO(adapter.toISO(date))
    },
    set: (value: string) => {
      banners.record!.metadata.end_date = adapter.toISO(value)
    },
  })

  onMounted(async () => {
    const res = await banners.edit(params.value.id)

    original.value = structuredClone(res)
  })

  onBeforeRouteLeave(() => {
    banners.record = null
  })

  function onClickCancel () {
    banners.record = structuredClone(original.value!)
  }

  function onClickSave (form: SubmitEvent) {
    const data = new FormData(form.target as HTMLFormElement)

    banners.save(original.value!.id, data)
  }

  function onUpdateLogo (file: File[]) {
    banners.record!.metadata.images.logo.url = file.length
      ? URL.createObjectURL(file[0])
      : original.value!.metadata.images.logo.url
  }

  function onUpdateBg (file: File[]) {
    banners.record!.metadata.images.bg.url = file.length
      ? URL.createObjectURL(file[0])
      : original.value!.metadata.images.bg.url
  }
</script>
