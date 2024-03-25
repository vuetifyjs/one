<template>
  <v-form
    v-if="promotions.record"
    enctype="multipart/form-data"
    @submit.prevent="onClickSave"
  >
    <input
      name="id"
      type="hidden"
      :value="promotions.record.id"
    >

    <input
      name="metadata[active]"
      type="hidden"
      :value="promotions.record.metadata.active"
    >

    <input
      v-if="!promotions.record.metadata.images.default"
      name="metadata[images][default]"
      type="hidden"
      :value="null"
    >

    <input
      v-if="!promotions.record.metadata.images.logolight"
      name="metadata[images][logolight]"
      type="hidden"
      :value="null"
    >

    <input
      v-if="!promotions.record.metadata.images.logodark"
      name="metadata[images][logodark]"
      type="hidden"
      :value="null"
    >

    <input
      v-if="!promotions.record.metadata.images.bglight"
      name="metadata[images][bglight]"
      type="hidden"
      :value="null"
    >

    <input
      v-if="!promotions.record.metadata.images.bgdark"
      name="metadata[images][bgdark]"
      type="hidden"
      :value="null"
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
          <v-col cols="6">
            <v-text-field
              v-model="promotions.record.title"
              label="Title"
              name="title"
              required
            />
          </v-col>

          <v-col cols="6">
            <v-text-field
              v-if="promotions.record.id"
              v-model="promotions.record.slug"
              label="Slug"
              name="slug"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-text-field
              v-model="promotions.record.metadata.short_text"
              label="Short Text"
              name="metadata[short_text]"
              required
            />
          </v-col>

          <v-col cols="12">
            <v-textarea
              v-model="promotions.record.metadata.text"
              label="Text"
              name="metadata[text]"
              required
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              append-inner-icon="$calendar"
              autocomplete="off"
              label="Start Date"
              :model-value="promotions.record.metadata.startdate"
              name="metadata[startdate]"
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
              label="End Date"
              :model-value="promotions.record.metadata.enddate"
              name="metadata[enddate]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-date-picker v-model="stop" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="promotions.record.metadata.url"
              label="Link URL"
              name="metadata[url]"
            />
          </v-col>

          <v-col cols="3">
            <v-number-input
              v-model="promotions.record.metadata.price"
              label="Price"
              name="metadata[price]"
            />
          </v-col>

          <v-col cols="3">
            <v-select
              v-model="promotions.record.metadata.type"
              item-title="key"
              :items="items"
              label="Type"
              name="metadata[type]"
            />
          </v-col>

          <v-col cols="3">
            <v-switch
              v-model="promotions.record.metadata.advertisement"
              label="Advertisement"
              name="metadata[advertisement]"
            />
          </v-col>

          <v-col cols="3">
            <v-switch
              v-model="promotions.record.metadata.discoverable"
              label="Discoverable"
              name="metadata[discoverable]"
            />
          </v-col>

          <v-col cols="6">
            <v-label>Default Image</v-label>

            <div class="d-flex align-center mb-2">
              <div class="text-truncate text-caption py-1">
                {{ promotions.record.metadata.images.default?.url || 'Choose a file' }}
              </div>

              <VoBtn
                v-if="promotions.record.metadata.images.default?.url"
                class="ms-6"
                text="Clear"
                variant="outlined"
                @click="promotions.record.metadata.images.default = null"
              />
            </div>

            <v-file-input
              accept="image/*"
              label="Upload logo"
              name="metadata[images][default]"
              @update:model-value="onUpdateDefaultImage"
            />
          </v-col>

          <v-col class="align-self-end" cols="6">
            <v-text-field
              append-inner-icon="$eyeDropper"
              autocomplete="off"
              label="Color"
              :model-value="promotions.record.metadata.color"
              name="metadata[color]"
            >
              <v-menu activator="parent" :close-on-content-click="false">
                <v-color-picker v-model="promotions.record.metadata.color" />
              </v-menu>
            </v-text-field>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <v-label>Logo Light</v-label>

                <div class="d-flex align-center mb-2">
                  <div class="text-truncate text-caption py-1">
                    {{ promotions.record.metadata.images.logolight?.url || 'Choose a file' }}
                  </div>

                  <VoBtn
                    v-if="promotions.record.metadata.images.logolight?.url"
                    class="ms-6"
                    text="Clear"
                    variant="outlined"
                    @click="promotions.record.metadata.images.logolight = null"
                  />
                </div>

                <v-file-input
                  accept="image/*"
                  label="Upload background"
                  name="metadata[images][logolight]"
                  @update:model-value="onUpdateLogoLight"
                />
              </v-col>

              <v-col cols="6">
                <v-label>Logo Dark</v-label>

                <div class="d-flex align-center mb-2">
                  <div class="text-truncate text-caption py-1">
                    {{ promotions.record.metadata.images.logodark?.url || 'Choose a file' }}
                  </div>

                  <VoBtn
                    v-if="promotions.record.metadata.images.logodark?.url"
                    class="ms-6"
                    text="Clear"
                    variant="outlined"
                    @click="promotions.record.metadata.images.logodark = null"
                  />
                </div>

                <v-file-input
                  accept="image/*"
                  label="Upload background"
                  name="metadata[images][logodark]"
                  @update:model-value="onUpdateLogoDark"
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="12">
            <v-row>
              <v-col cols="6">
                <v-label>Background Light</v-label>

                <div class="d-flex align-center mb-2">
                  <div class="text-truncate text-caption py-1">
                    {{ promotions.record.metadata.images.bglight?.url || 'Choose a file' }}
                  </div>

                  <VoBtn
                    v-if="promotions.record.metadata.images.bglight?.url"
                    class="ms-6"
                    text="Clear"
                    variant="outlined"
                    @click="promotions.record.metadata.images.bglight = null"
                  />
                </div>

                <v-file-input
                  accept="image/*"
                  label="Upload background"
                  name="metadata[images][bglight]"
                  @update:model-value="onUpdateBgLight"
                />
              </v-col>

              <v-col cols="6">
                <v-label>Background Dark</v-label>

                <div class="d-flex align-center mb-2">
                  <div class="text-truncate text-caption py-1">
                    {{ promotions.record.metadata.images.bgdark?.url || 'Choose a file' }}
                  </div>

                  <VoBtn
                    v-if="promotions.record.metadata.images.bgdark?.url"
                    class="ms-6"
                    text="Clear"
                    variant="outlined"
                    @click="promotions.record.metadata.images.bgdark = null"
                  />
                </div>

                <v-file-input
                  accept="image/*"
                  label="Upload background"
                  name="metadata[images][bgdark]"
                  @update:model-value="onUpdateBgDark"
                />
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-list
              bg-color="surface-light"
              lines="three"
              rounded
            >
              <v-list-subheader>Promotions preview:</v-list-subheader>

              <v-divider class="mt-1" />

              <v-row class="ma-0">
                <v-col cols="5">
                  <h4>Default:</h4>

                  <VoPromotionsCardVuetify />
                </v-col>

                <v-col cols="7">
                  <h4>Highlighted:</h4>

                  <VoPromotionsCardHighlight border />
                </v-col>

                <v-col cols="12">
                  <h4>Footer:</h4>
                  <VoPromotionsFooter border />
                </v-col>
              </v-row>
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <template #actions>
        <VSwitch
          v-model="promotions.record.metadata.active"
          class="ms-2"
          label="Active"
        />

        <v-spacer />

        <v-btn
          :disabled="isPristine || promotions.isLoading"
          text="Cancel"
          @click="onClickCancel"
        />

        <v-btn
          :disabled="isPristine"
          :loading="promotions.isLoading"
          text="Save"
          type="submit"
        />
      </template>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>
  // Types
  import type { Promotion } from '@/stores/promotions'

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
  const promotions = usePromotionsStore()
  const router = useRouter()

  const original = ref<Promotion>()

  const items = ['theme', 'video', 'book', 'course', 'website', 'job', 'merch', 'digital', 'services', 'documentation']

  const start = computed({
    get: () => {
      const date = adapter.date(promotions.record?.metadata.startdate)

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      promotions.record!.metadata.startdate = adapter.toISO(value)
    },
  })

  const stop = computed({
    get: () => {
      const date = adapter.date(promotions.record?.metadata.enddate)

      return adapter.parseISO(adapter.toISO(date)) as string
    },
    set: (value: string) => {
      promotions.record!.metadata.enddate = adapter.toISO(value)
    },
  })

  function onClickCancel () {
    emit('click:cancel')
  }

  async function onClickSave (form: SubmitEvent) {
    emit('click:save', form)
  }

  function onUpdateDefaultImage (file: File[]) {
    promotions.record!.metadata.images.default = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.default?.url } as any
  }

  function onUpdateLogoLight (file: File[]) {
    promotions.record!.metadata.images.logolight = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.logolight?.url } as any
  }

  function onUpdateLogoDark (file: File[]) {
    promotions.record!.metadata.images.logodark = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.logodark?.url } as any
  }

  function onUpdateBgLight (file: File[]) {
    promotions.record!.metadata.images.bglight = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.bglight?.url } as any
  }

  function onUpdateBgDark (file: File[]) {
    promotions.record!.metadata.images.bgdark = file.length
      ? { url: URL.createObjectURL(file[0]) } as any
      : { url: original.value!.metadata.images.bgdark?.url } as any
  }
</script>
