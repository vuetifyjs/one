<template>
  <v-form
    v-if="spots.record"
    enctype="multipart/form-data"
    @submit.prevent="onClickSave"
  >
    <input
      v-if="spots.record.id"
      name="id"
      type="hidden"
      :value="spots.record.id"
    >

    <input
      name="metadata[active]"
      type="hidden"
      :value="spots.record.metadata.active"
    >

    <v-card>
      <v-toolbar :title="title">
        <template #append>
          <VoBtn
            prepend-icon="mdi-arrow-left"
            text="Go Back"
            @click="router.go(-1)"
          />
        </template>
      </v-toolbar>

      <v-divider />

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="spots.record.title"
              label="Title"
              name="title"
              required
            />
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="spots.record.metadata.href"
              label="Link URL"
              name="metadata[href]"
            />
          </v-col>

          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="spots.record.metadata.site"
              clearable
              :items="sites"
              label="Site(s)"
              multiple
            />

            <input
              v-for="site in spots.record.metadata.site"
              :key="site"
              name="metadata[site][]"
              type="hidden"
              :value="site"
            >
          </v-col>

          <v-col cols="6" md="4">
            <v-text-field
              append-inner-icon="$calendar"
              autocomplete="off"
              :items="sites"
              label="Start Date"
              :model-value="spots.record.metadata.start_date"
              name="metadata[start_date]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-date-picker v-model="start" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="6" md="4">
            <v-text-field
              append-inner-icon="$calendar"
              autocomplete="off"
              :items="sites"
              label="End Date"
              :model-value="spots.record.metadata.end_date"
              name="metadata[end_date]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-date-picker v-model="stop" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="spots.record.metadata.sponsor"
                  label="Sponsor name"
                  name="metadata[sponsor]"
                />
              </v-col>

              <v-col cols="12">
                <v-label>Background</v-label>

                <div class="d-flex align-center mb-4">
                  <div class="text-truncate text-caption py-1">
                    {{ spots.record.metadata.image?.url || 'Choose a file' }}
                  </div>

                  <VoBtn
                    v-if="spots.record.metadata.image?.url"
                    class="ms-6"
                    text="Clear"
                    variant="outlined"
                    @click="spots.record.metadata.image = null"
                  />
                </div>

                <v-file-input
                  accept="image/*"
                  class="mb-4"
                  label="Upload background"
                  name="metadata[image]"
                  @update:model-value="onUpdateImage"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12" md="6">
            <v-sheet
              class="overflow-hidden"
              color="surface-light"
              min-height="300"
              rounded
            >
              <v-list-subheader class="px-4 pt-4 pb-3">Spot preview (225x260):</v-list-subheader>

              <v-divider class="mt-1" />

              <div class="pa-4">
                <VoSpot />
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <template #actions>
        <VSwitch
          v-model="spots.record.metadata.active"
          class="ms-2"
          label="Active"
        />

        <v-spacer />

        <v-btn
          :disabled="isPristine || spots.isLoading"
          text="Cancel"
          @click="onClickCancel"
        />

        <v-btn
          :disabled="isPristine"
          :loading="spots.isLoading"
          text="Save"
          type="submit"
        />
      </template>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
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
  const sites = ['*', 'vbin', 'vplay', 'home', 'docs', 'server', 'dev', 'one']

  const start = computed({
    get: () => {
      const date = adapter.date(
        spots.record?.metadata.start_date
          ? spots.record.metadata.start_date
          : undefined
      )

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      spots.record!.metadata.start_date = adapter.toISO(value)
    },
  })

  const stop = computed({
    get: () => {
      const date = adapter.date(
        spots.record?.metadata.end_date
          ? spots.record.metadata.end_date
          : undefined
      )

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      spots.record!.metadata.end_date = adapter.toISO(value)
    },
  })

  const adapter = useDate()
  const spots = useSpotsStore()
  const router = useRouter()

  function onClickCancel () {
    emit('click:cancel')
  }

  async function onClickSave (form: SubmitEvent) {
    emit('click:save', form)
  }

  function onUpdateImage (file: File) {
    spots.record!.metadata.image = {
      url: file ? URL.createObjectURL(file) : '',
    }
  }
</script>
