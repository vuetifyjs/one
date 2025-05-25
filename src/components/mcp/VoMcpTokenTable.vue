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
      </tr>
    </thead>

    <tbody>
      <tr>
        <td>
          {{ props.apiKey.accessToken.slice(0, 5) }}...{{ props.apiKey.accessToken.slice(-4) }}
        </td>

        <td>{{ new Date(props.apiKey.createdAt).toLocaleDateString('en-US').slice(0, 8) }}</td>

        <td>{{ new Date(props.apiKey.updatedAt).toLocaleDateString('en-US').slice(0, 8) }}</td>


      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
  const props = defineProps({
    apiKey: {
      type: Object,
      required: true,
    },
  })
</script>
