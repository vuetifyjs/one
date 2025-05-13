<template>
  <v-dialog
    v-if="team.teamInviteDialog"
    v-model="team.teamInviteDialog"
    max-width="500"
  >
    <template #default="{ isActive }">
      <v-card :prepend-icon="`svg:${mdiAtomVariant}`" rounded="lg" title="Join a Team">
        <template #append>
          <div class="me-n3">
            <v-btn
              icon="$close"
              size="x-small"
              variant="text"
              @click="clearQuery(isActive)"
            />
          </div>
        </template>

        <template #text>
          You have been invited to join <strong>{{ teamName }}</strong>!
        </template>

        <v-divider opacity=".2" />

        <v-card-actions class="bg-surface-light">
          <v-btn
            :disabled="team.isLoading"
            rounded="lg"
            text="Cancel"
            variant="plain"
            @click="clearQuery(isActive)"
          />

          <v-spacer />

          <v-btn
            append-icon="$success"
            color="success"
            :disabled="team.isLoading"
            rounded="lg"
            text="Accept"
            variant="flat"
            @click="team.joinTeam()"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script lang="ts" setup>
  import { mdiAtomVariant } from '@mdi/js'

  const team = useTeamStore()

  const teamName = computed(() => team.team?.name ?? `${team.team?.owner.name}'s team`)

  function clearQuery (isActive: Ref<boolean>) {
    team.clearTeamQuery()
    isActive.value = false
  }
</script>
