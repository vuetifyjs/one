<template>
  <VoDialog
    v-model="dialog"
    :prepend-icon="`svg:${mdiBell}`"
    title="Team"
  >
    <v-container class="pa-md-10" fluid>
      <v-card
        v-if="teamStore.isTeamOwner"
        border
        class="mb-4"
        color="surface-light"
        flat
        max-width="1280"
        rounded="lg"
      >
        <v-card-item
          class="bg-surface"
          :prepend-icon="`svg:${mdiAccountGroupOutline}`"
          :subtitle="`Team - ${team?.members?.length} members`"
          title="Members"
        >
          <template v-if="teamStore.isTeamOwner" #append>
            <v-btn
              border
              class="text-none"
              color="primary"
              :prepend-icon="`svg:${mdiAccountGroupOutline}`"
              rounded="lg"
              variant="flat"
            >
              Add member

              <v-menu
                activator="parent"
                :close-on-content-click="false"
                max-width="450"
                offset="8"
                width="100%"
              >
                <v-card color="surface-light">
                  <v-card-item
                    class="bg-surface"
                    :prepend-icon="`svg:${mdiLinkVariant}`"
                    subtitle="Provide this link to invite your team members"
                    title="Member invite link"
                  >
                    <template #append>
                      <v-btn
                        class="text-none"
                        :color="reset ? undefined : 'error'"
                        :disabled="reset"
                        flat
                        slim
                        text="Reset"
                        @click="onClickReset"
                      />
                    </template>
                  </v-card-item>

                  <v-card-text class="pt-4">
                    <v-text-field
                      flat
                      hide-details
                      label="Invite link"
                      :model-value="invite"
                      readonly
                      variant="solo"
                    >
                      <template #append-inner>
                        <v-icon
                          v-tooltip="'Copy Team link'"
                          :icon="`svg:${copied ? mdiCheck : mdiContentCopy}`"
                          size="small"
                          @click="onClickCopy"
                        />
                      </template>
                    </v-text-field>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-btn>
          </template>
        </v-card-item>

        <v-divider />

        <v-card-text>
          <v-sheet border rounded="lg">
            <v-data-table
              :headers="headers"
              :hide-default-footer="team?.members?.length! < 10"
              :items="team.members"
            >
              <template #item.name="{ item }">
                <div class="d-flex align-center">
                  <v-avatar :image="item.picture" size="x-small" start />

                  <span>{{ item.name }}</span>
                </div>
              </template>

              <template #item.actions="{ item }">
                <v-btn
                  v-if="team?.owner?.id === item.id "
                  class="text-none"
                  color="primary"
                  :prepend-icon="`svg:${mdiShieldLock}`"
                  readonly
                  slim
                  text="Team owner"
                  variant="tonal"
                />

                <v-btn
                  v-else
                  :prepend-icon="`svg:${mdiAccountRemoveOutline}`"
                  text="Revoke"
                  variant="text"
                  @click="teamStore.removeFromTeam(item.id)"
                />
              </template>
            </v-data-table>
          </v-sheet>
        </v-card-text>
      </v-card>

      <v-card
        v-else
        border
        color="surface-light"
        flat
        max-width="1280"
        rounded="lg"
      >
        <v-card-item
          :prepend-icon="`svg:${mdiShieldLock}`"
          subtitle="You are currently a member of a team with an All-access Pass."
          title="My Team access"
        >
          <template #title>
            <div class="d-flex align-center">
              My Team Access

              <v-chip
                border="thin opacity-25 success"
                class="ms-2"
                color="success"
                label
                size="x-small"
                text="Active"
              />
            </div>
          </template>

          <template #append>
            <V-btn
              prepend-icon="mdi-exit-to-app"
              rounded="lg"
              text="Leave team"
              width="145"
              @click="teamStore.leaveTeam()"
            />
          </template>
        </v-card-item>
      </v-card>
    </v-container>
  </vodialog></template>

  <script setup lang="ts">
    // Icons
  import { mdiAccountGroupOutline, mdiAccountRemoveOutline, mdiBell, mdiCheck, mdiContentCopy, mdiLinkVariant, mdiShieldLock } from '@mdi/js'

  const one = useOneStore()
  const teamStore = useTeamStore()
  const http = useHttpStore()
  const team = computed(() => teamStore.team)
  const query = useQuery<{ one: string, team: string}>()

  const copied = shallowRef(false)
  const reset = shallowRef(false)

  const headers = [
    {
      title: 'Name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'end',
      sortable: false,
    },
  ] as const

  const invite = computed(() => `https://one.vuetifyjs.com/?invite=${teamStore.team?.inviteCode}`)

  const dialog = defineModel('modelValue', { type: Boolean })

  function onClickCopy () {
    copied.value = true

    navigator.clipboard.writeText(invite.value)

    setTimeout(() => {
      copied.value = false
    }, 2000)
  }

  async function onClickReset () {
    reset.value = true

    const res = await http.post('/one/team/regen')

    teamStore.team = res.team
  }

  watch(query, async () => {
    if (!one.sessionId || query.value.one === 'subscribe') return
    if (!query.value.team) return
    window.value = one.sessionId || query.value.one === 'status' ? 'status' : 'subscribe'

    one.isOpen = true

    await nextTick()

    dialog.value = true
  }, { immediate: true })
  </script>
