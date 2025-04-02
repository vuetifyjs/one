<template>
  <v-dialog
    v-if="team.teamInviteDialog"
    v-model="team.teamInviteDialog"
    max-width="500"
  >
    <template #default="{ isActive }">
      <v-card title="Join a Team">
        <v-card-text>
          You have been invited to join {{ teamName }}!
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Join"
            @click="team.joinTeam()"
          />
          <v-btn
            text="Cancel"
            @click="clearQuery(isActive)"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script setup lang="ts">
  const team = useTeamStore()

  const teamName = computed(() => team.team?.name ? team.team.name : `${team.team?.owner.name}'s team`)

  function clearQuery (isActive: Ref<boolean>) {
    team.clearTeamQuery()
    isActive.value = false
  }

</script>
