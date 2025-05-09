<template>

  <v-table class="rounded border mt-4">
    <thead>
      <tr>
        <th>Secret&nbsp;Key</th>

        <th>Created</th>

        <th class="d-flex align-center">
          Last Used
          <v-icon
            v-tooltip:top="'This is updated within the last 10 minutes'"
            end
            icon="$info"
            size="1em"
          />
        </th>

        <th class="text-center">Usage</th>

        <th class="text-end">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>
          {{ props.apiKey.accessToken.slice(0, 5) }}...{{ props.apiKey.accessToken.slice(-4) }}
        </td>

        <td>{{ new Date(props.apiKey.createdAt).toLocaleDateString('en-US').slice(0, 8) }}</td>

        <td>{{ new Date(props.apiKey.updatedAt).toLocaleDateString('en-US').slice(0, 8) }}</td>

        <td class="d-flex align-center justify-center ga-4">
          <span>{{ `0/${props.apiKey.allowance}` }}</span>

          <v-progress-linear
            :max="props.apiKey.allowance"
            :model-value="0"
            rounded
            rounded-bar
            style="width: 100px"
          />
        </td>

        <td class="text-end">
          <v-icon-btn
            color="error"
            :icon="`svg:${mdiTrashCanOutline}`"
            size="small"
            variant="text"
            @click="onClickDelete"
          />
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>

  import { mdiTrashCanOutline } from '@mdi/js'

  const props = defineProps({
    apiKey: {
      type: Object,
      required: true,
    },
  })

  function onClickDelete () {
    console.log('delete')
  }
</script>
