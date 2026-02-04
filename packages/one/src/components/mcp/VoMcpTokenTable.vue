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
              :text="api.key ? api.trim : ''"
              :variant="isHovering || copied ? 'tonal' : 'text'"
              @click="copy(api.key)"
            >
              <template #append>
                <v-icon :icon="copied ? '$success' : `svg:${mdiContentCopy}`" :opacity="isHovering || copied ? 1 : 0" />
              </template>
            </v-btn>
          </v-hover>
        </td>

        <td>{{ api.accessToken ? date.format(api.accessToken.createdAt, 'fullDate') : '' }}</td>

        <td class="text-end">{{ api.accessToken ? date.format(api.accessToken.updatedAt, 'fullDate') : '' }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  import { mdiContentCopy } from '@mdi/js'

  const api = useApiKeyStore()
  const { copy, copied } = useCopy(2000)
  const date = useDate()
</script>
