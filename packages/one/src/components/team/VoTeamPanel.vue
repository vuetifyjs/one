<script lang="ts" setup>
  // Icons
  import {
    mdiAccount,
    mdiAccountRemoveOutline,
    mdiCheck,
    mdiContentCopy,
    mdiExitToApp,
    mdiLinkVariant,
    mdiShieldLock,
  } from '@mdi/js'

  const teamStore = useTeamStore()
  const http = useHttpStore()
  const { copy, copied } = useCopy()
  const team = computed(() => teamStore.team)

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

  async function onClickReset () {
    reset.value = true

    const res = await http.post('/one/team/regen')

    teamStore.team = res.team
  }
</script>

<template>
  <div class="px-3">
    <v-card-text>
      <VoDialogSubheader
        text="Share access to Vuetify One with up to 25 team members."
        title="Manage your team"
      />

      <v-card
        border
        class="mb-4"
        color="surface-light"
        flat
        max-width="1280"
        rounded="lg"
      >
        <v-card-item
          class="bg-surface"
          :subtitle="`Team - ${team?.members?.length} member(s)`"
          title="Members"
        >
          <template v-if="teamStore.isTeamOwner" #append>
            <v-btn
              border
              class="text-none"
              color="primary"
              :prepend-icon="`svg:${mdiAccount}`"
              rounded="lg"
              variant="flat"
            >
              Add member

              <v-menu
                activator="parent"
                :close-on-content-click="false"
                location="bottom end"
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
                          @click="copy(invite)"
                        />
                      </template>
                    </v-text-field>
                  </v-card-text>
                </v-card>
              </v-menu>
            </v-btn>
          </template>

          <template v-else #append>
            <v-btn
              :prepend-icon="`svg:${mdiExitToApp}`"
              rounded="lg"
              text="Leave team"
              width="145"
              @click="teamStore.leaveTeam()"
            />
          </template>
        </v-card-item>

        <v-divider />

        <v-card-text class="pa-2">
          <v-sheet border rounded="lg">
            <v-data-table
              :headers="headers"
              :hide-default-footer="team?.members?.length! < 10"
              :items="team?.members"
            >
              <template #item.name="{ item }">
                <div class="d-flex align-center">
                  <v-avatar :image="item.picture" size="x-small" start />

                  <span>{{ item.name }}</span>
                </div>
              </template>

              <template #item.actions="{ item }">
                <v-btn
                  v-if="team?.owner?.id === item.id"
                  class="me-n3"
                  color="primary"
                  density="comfortable"
                  :prepend-icon="`svg:${mdiShieldLock}`"
                  readonly
                  slim
                  text="Team owner"
                  variant="tonal"
                />

                <v-btn
                  v-else-if="teamStore.isTeamOwner"
                  class="me-n3"
                  color="medium-emphasis"
                  density="comfortable"
                  :prepend-icon="`svg:${mdiAccountRemoveOutline}`"
                  slim
                  text="Revoke"
                  variant="text"
                  @click="teamStore.removeFromTeam(item.id)"
                />
              </template>
            </v-data-table>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-card-text>
  </div>
</template>
