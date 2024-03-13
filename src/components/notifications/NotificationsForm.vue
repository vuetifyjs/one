<template>
  <v-form
    v-if="notifications.record"
    enctype="application/x-www-form-urlencoded"
    @submit.prevent="onClickSave"
  >
    <input
      v-if="notifications.record.id"
      :value="notifications.record.id"
      name="id"
      type="hidden"
    >

    <input
      :value="notifications.record.metadata.active"
      name="metadata[active]"
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
          <v-col cols="8">
            <v-text-field
              v-model="notifications.record.title"
              label="Title"
              name="title"
              required
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="notifications.record.metadata.emoji"
              label="Emoji"
              name="metadata[emoji]"
            />
          </v-col>

          <v-col cols="8">
            <v-text-field
              v-model="notifications.record.metadata.action"
              label="Link URL"
              name="metadata[action]"
            />
          </v-col>

          <v-col cols="4">
            <v-text-field
              v-model="notifications.record.metadata.action_text"
              label="Link Text"
              name="metadata[action_text]"
            />
          </v-col>

          <v-col cols="6">
            <v-row>
              <v-col cols="12">
                <v-textarea
                  v-model="notifications.record.metadata.text"
                  label="Text"
                  name="metadata[text]"
                  required
                />
              </v-col>

              <v-col v-if="notifications.record.created_at" cols="7">
                <v-text-field
                  :model-value="adapter.format(notifications.record.created_at, 'fullDateWithWeekday')"
                  label="Created at"
                  disabled
                />
              </v-col>
            </v-row>
          </v-col>

          <v-col cols="6">
            <v-list
              bg-color="surface-variant"
              lines="three"
              rounded
            >
              <v-list-subheader>Notification preview:</v-list-subheader>

              <v-divider class="mt-1" />

              <VoNotificationsListItem
                :notification="notifications.record"
                demo
              />
            </v-list>
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <template #actions>
        <VSwitch
          v-model="notifications.record.metadata.active"
          class="ms-2"
          label="Active"
        />

        <v-spacer />

        <v-btn
          :disabled="isPristine || notifications.isLoading"
          text="Cancel"
          @click="onClickCancel"
        />

        <v-btn
          :disabled="isPristine"
          :loading="notifications.isLoading"
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

  // Stores
  import { useNotificationsStore } from '@/stores/notifications'

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
  const notifications = useNotificationsStore()
  const router = useRouter()

  function onClickCancel () {
    emit('click:cancel')
  }

  async function onClickSave (form: SubmitEvent) {
    emit('click:save', form)
  }
</script>
