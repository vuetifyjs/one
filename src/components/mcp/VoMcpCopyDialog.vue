<template>
  <v-dialog v-slot="{ isActive }" v-model="dialog" max-width="500">
    <v-card prepend-icon="mdi-hand-okay" title="Save your Key">
      <template #append>
        <v-icon-btn icon="mdi-close" @click="isActive.value = false" />
      </template>

      <v-divider />

      <v-card-text>
        <p class="mb-4">
          Please save your secret key in a safe place since
          <strong>you won't be able</strong> to view it again. Keep it secure,
          as anyone with your API key can make requests on your behalf. If you
          do lose it, you'll need to generate a new one.
        </p>

        <v-text-field
          v-if="apiKey"
          :ref="el => apiKeyField = el"
          color="success"
          :model-value="apiKey"
          variant="outlined"
        >
          <template #append-inner>
            <v-btn
              class="text-none"
              color="success"
              :prepend-icon="copied ? 'mdi-check' : 'mdi-content-copy'"
              size="small"
              variant="flat"
              @click="onClickCopy"
            >
              <template #prepend>
                <v-fade-transition hide-on-leave>
                  <v-icon :key="String(copied)" />
                </v-fade-transition>
              </template>

              Copy
            </v-btn>
          </template>
        </v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          class="text-none"
          color="surface-variant"
          size="small"
          text="Done"
          variant="flat"
          @click="dialog = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>

  const copied = shallowRef(false)
  const apiKeyField = ref()
  const dialog = defineModel('modelValue', { type: Boolean })

  const props = defineProps({
    apiKey: {
      type: String,
      required: true,
    },
  })

  function onClickCopy () {

    copied.value = true
    navigator.clipboard.writeText(props.apiKey)

    setTimeout(() => (copied.value = false), 1000)
  }
</script>
