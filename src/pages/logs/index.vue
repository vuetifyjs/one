<template>
  <v-container class="h-100">
    <VoCard prepend-icon="mdi-message-text-clock">
      <template #prepend>
        <v-card-item>
          <v-card-title>System logs</v-card-title>
          <v-card-subtitle>
            {{ pagination.totalCount }} record{{ pagination.totalCount > 1 ? 's' : '' }}
            <span v-if="pagination.cursorOffset">(+{{ pagination.cursorOffset }})</span>
          </v-card-subtitle>
        </v-card-item>
      </template>
      <template #append>
        <div class="d-flex align-center ga-2">
          <!--<v-checkbox-btn v-model="live" false-icon="mdi-truck-delivery" true-icon="mdi-pause-circle" />-->
          <v-text-field v-model="query" clearable label="search" prepend-inner-icon="mdi-magnify" />
          <v-select v-model="level" :items="levels" label="Level" />
          <v-btn icon="mdi-reload" :loading="isLoading" @click="fetchLogs" />
        </div>
      </template>

      <v-list class="py-0" density="compact">
        <template v-for="(log, index) in logs" :key="log.id">
          <v-divider v-if="index" />
          <v-list-item
            :base-color="levelColor(log.level)"
            link
            :prepend-icon="levelIcon(log.level)"
            :title="log.msg.split('\n').at(0)"
            variant="tonal"
          >
            <template #append>
              <div class="d-flex flex-column align-end">
                <span>{{ formatDate(log.time) }}</span>
                <v-list-item-subtitle v-if="log.responseTime != null">
                  {{ log.responseTime }}ms
                </v-list-item-subtitle>
              </div>
            </template>
            <template #subtitle>
              <span v-if="log.route">{{ log.route }}&emsp;{{ log.query }}</span>
              <span v-else>&nbsp;</span>
            </template>

            <v-dialog v-slot="{ isActive }" activator="parent" width="auto">
              <v-card>
                <v-toolbar :color="levelColor(log.level)">
                  <v-card-item class="flex-1-1">
                    <template #title>
                      <span class="text-uppercase">{{ levelLabel(log.level) }}:&nbsp;</span>
                      {{ log.msg.split('\n').at(0) }}
                    </template>
                    <template #subtitle>
                      {{ log.route }}&emsp;{{ log.query }}
                    </template>
                    <template #append>
                      {{ log.time }}
                    </template>
                  </v-card-item>
                  <v-btn icon="$close" variant="text" @click="isActive.value = false" />
                </v-toolbar>
                <div class="d-flex flex-column ga-4 mt-4">
                  <p v-if="!log.data.err" class="text-pre-wrap px-6">{{ log.msg }}</p>
                  <div v-if="log.data.req">
                    <p class="text-h6 mb-1 px-6">URL:</p>
                    <v-code class="px-6">{{ log.data.url }}</v-code>
                    <template v-if="log.query">
                      <p class="text-h6 mb-1 px-6">Query:</p>
                      <v-code class="px-6">
                        <pre>{{ log.data.query }}</pre>
                      </v-code>
                    </template>
                    <p class="text-h6 px-6">Request ID:</p>
                    <v-code class="px-6">{{ log.data.req.id }}</v-code>
                  </div>
                  <div v-if="log.user">
                    <p class="text-h6 px-6">User:</p>
                    <v-code class="px-6">
                      <router-link :to="`/users/${log.user.id}`">{{ log.user.id }}</router-link>
                    </v-code>
                  </div>
                  <div v-if="log.data.err">
                    <p class="text-h6 mb-1 px-6">Stack:</p>
                    <v-code class="px-6 overflow-x-auto">
                      <pre>{{ log.data.err.stack }}</pre>
                    </v-code>
                  </div>
                  <v-expansion-panels class="w-auto" flat>
                    <v-expansion-panel title="Raw data">
                      <v-expansion-panel-text>
                        <v-code class="mt-n2 mx-n6 mb-n4 px-6 overflow-x-auto">
                          <pre>{{ log }}</pre>
                        </v-code>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </div>
              </v-card>
            </v-dialog>
          </v-list-item>
        </template>
        <!-- Padding for consistent height -->
        <v-list-item v-for="i in pagination.pageSize - logs.length" :key="i">
          <v-list-item-title>&nbsp;</v-list-item-title>
          <v-list-item-subtitle>&nbsp;</v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-pagination v-model="page" :length="pagination.pageCount" />
    </VoCard>
  </v-container>
</template>

<script setup lang="ts">
  import { useRouteQuery } from '@vueuse/router'
  import { formatRelative } from 'date-fns'
  import { enUS } from 'date-fns/locale/en-US'

  definePage({
    meta: {
      requiresAdmin: true,
      requiresAuth: true,
    },
  })

  const levels = [
    { title: 'trace', value: 0 },
    { title: 'debug', value: 20 },
    { title: 'info', value: 30 },
    { title: 'warn', value: 40 },
    { title: 'error', value: 50 },
    { title: 'fatal', value: 60 },
  ]

  const isLoading = shallowRef(false)
  const now = ref(new Date())
  // const live = ref(false)
  const query = useRouteQuery('search', '', { mode: 'replace' })
  const level = useRouteQuery('level', 40, { transform: Number, mode: 'replace' })
  const page = useRouteQuery('page', 1, { transform: Number, mode: 'replace' })
  const logs = ref<any[]>([])
  const pagination = ref({
    pageSize: 12,
    pageCount: 0,
    cursorOffset: 0,
    totalCount: 0,
  })
  const http = useHttpStore()

  let nowTimer = -1
  onBeforeMount(async () => {
    nowTimer = window.setInterval(() => {
      now.value = new Date()
    }, 60000)

    await fetchLogs()
  })
  onUnmounted(() => {
    clearInterval(nowTimer)
  })

  let firstItem: string | undefined
  watch([level, query], () => {
    page.value = 1
  })
  watch(page, (newVal, oldVal) => {
    if (newVal !== 1 && oldVal === 1) {
      firstItem = logs.value.at(0)?.id
    } else if (newVal === 1) {
      firstItem = undefined
    }
  }, { flush: 'sync' })

  watch([level, query, page], fetchLogs)

  async function fetchLogs () {
    const params = new URLSearchParams(Object.entries({
      q: query.value || undefined,
      level: level.value,
      page: page.value,
      cursor: firstItem,
    }).filter(([, v]) => v != null) as any)

    isLoading.value = true
    const { logs: _logs, ...rest } = await http.get('/admin/logs?' + params.toString())
    isLoading.value = false

    _logs.forEach((log: any) => {
      if (log.data.query) {
        log.query = new URLSearchParams(log.data.query).toString()
      }
    })

    logs.value = _logs
    pagination.value = rest
  }

  function levelIcon (level: number) {
    return {
      30: 'mdi-information',
      40: 'mdi-alert-circle',
      50: 'mdi-alert',
      60: 'mdi-alert-octagon',
    }[level] || 'mdi-bug'
  }

  function levelColor (level: number) {
    return {
      30: 'info',
      40: 'warning',
      50: 'error',
      60: 'red-darken-2',
    }[level] || ''
  }

  function levelLabel (level: number) {
    return levels.find(l => l.value === level)?.title ?? level
  }

  function formatDate (date: string) {
    return formatRelative(date, now.value, {
      locale: {
        ...enUS,
        formatRelative: token => ({
          lastWeek: 'yyyy-MM-dd HH:mm',
          yesterday: "HH:mm 'yesterday'",
          today: 'HH:mm',
          tomorrow: 'HH:mm',
          nextWeek: "'Next' eeee",
          other: 'yyyy-MM-dd HH:mm',
        })[token],
      },
    })
  }
</script>
