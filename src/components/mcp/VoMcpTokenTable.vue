<template>
  <v-table class="rounded border mt-4">
    <thead>
      <tr>
        <th class="ps-6">Secret&nbsp;Key</th>

        <th>Created</th>

        <th class="d-flex align-center justify-end">
          Last Used
          <v-icon
            v-tooltip:top="'This is updated within the last 10 minutes'"
            end
            icon="$info"
            size="1em"
          />
        </th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>
          <v-hover v-slot="{ isHovering, props: hoverProps}">
            <v-btn
              v-bind="hoverProps"
              :color="isHovering || copied ? 'primary' : undefined"
              slim
              :text="`${apiKey.apiKey.slice(0, 6)}...${apiKey.apiKey.slice(-6)}`"
              :variant="isHovering || copied ? 'tonal' : 'text'"
              @click="onClickCopy"
            >
              <template #append>
                <v-icon :icon="copied ? '$success' : `svg:${mdiContentCopy}`" :opacity="isHovering || copied ? 1 : 0" />
              </template>
            </v-btn>
          </v-hover>
        </td>

        <td>{{ date.format(apiKey.createdAt, 'fullDate') }}</td>

        <td class="text-end">{{ date.format(apiKey.updatedAt, 'fullDate') }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  import { mdiContentCopy } from '@mdi/js'

  const { apiKey } = defineProps<{
    apiKey: {
      id: string
      apiKey: string
      createdAt: string
      updatedAt: string
    }
  }>()

  const copied = shallowRef(false)
  const date = useDate()

  function onClickCopy () {
    navigator.clipboard.writeText(apiKey.apiKey)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
</script>
