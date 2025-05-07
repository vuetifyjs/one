<v-table v-if="apiKey" class="rounded border">
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
    {{ apiKey.accessToken.slice(0, 5) }}...{{ apiKey.accessToken.slice(-4) }}
  </td>

  <td>{{ new Date(apiKey.createdAt).toLocaleDateString('en-US').slice(0, 8) }}</td>

  <td>{{ new Date(apiKey.updatedAt).toLocaleDateString('en-US').slice(0, 8) }}</td>

  <td class="d-flex align-center justify-center ga-4">
    <span>{{ `0/${apiKey.allowance}` }}</span>

    <v-progress-linear
      :max="apiKey.allowance"
      :model-value="0"
      rounded
      rounded-bar
      style="width: 100px"
    />
  </td>

  <td class="text-end">
    <v-icon-btn
      :loading="isLoading.has('refresh')"
      :readonly="isLoading.has('refresh')"
      color="info"
      icon="mdi-refresh"
      size="small"
      variant="text"
      @click="onClickRefresh"
    />

    <v-icon-btn
      color="error"
      icon="mdi-trash-can-outline"
      size="small"
      variant="text"
      @click="onClickDelete"
    />
  </td>
</tr>
</tbody>
</v-table>

<script lang="ts" setup>

</script>
