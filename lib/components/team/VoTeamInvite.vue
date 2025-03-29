<template>
  <v-dialog
    v-model="one.teamInviteDialog"
    max-width="500"
  >
    <template #default="{ isActive }">
      <v-card title="Join a Team">
        <v-card-text>
          You have been invited to join a team!
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            text="Join"
            @click="one.joinTeam()"
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
  const one = useOneStore()

  function clearQuery (isActive: Ref<boolean>) {
    one.clearTeamQuery()
    isActive.value = false
  }

</script>
