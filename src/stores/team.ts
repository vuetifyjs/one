// Types
import type { ComputedRef, Ref, ShallowRef } from 'vue'

export type VOneTeam = {
  id: string
  name: string
  inviteCode: string
  members: {
    id: string
    name: string
    picture: string
  }[]
  owner: {
    id: string
    name: string
    picture: string
  }
}

export interface TeamState {
  team: Ref<VOneTeam | null>
  teamInviteDialog: Ref<boolean>
  teamInviteCode: ComputedRef<string | undefined>
  hasTeamAccess: ComputedRef<boolean>
  isTeamOwner: ComputedRef<boolean>
  isLoading: ShallowRef<boolean>
  removeFromTeam: (id: string) => Promise<void>
  leaveTeam: () => Promise<void>
  joinTeam: () => Promise<void>
  clearTeamQuery: () => void
}

export const useTeamStore = defineStore('team', () => {
  const query = useQuery<{ invite: string }>()

  const auth = useAuthStore()
  const one = useOneStore()
  const http = useHttpStore()
  const queue = useQueueStore()

  const isLoading = shallowRef(false)

  const team = ref<VOneTeam | null>(null)
  const teamInviteDialog = ref(false)
  const teamInviteCode = computed(() => query.value.invite)

  const hasTeamAccess = computed(() =>
    team.value
      ? one.access?.some((access: string) => ['one/team', 'snips/team'].includes(access))
      : false,
  )

  watch(teamInviteCode, async () => {
    if (!teamInviteCode.value) {
      return
    }
    if (!auth.user) {
      auth.dialog = true
    }

    try {
      isLoading.value = true

      const res = await http.get(`/one/team/${teamInviteCode.value}`)
      team.value = res.team
      teamInviteDialog.value = true
    } catch (error: any) {
      clearTeamQuery()
      queue.showError(error.message)
    } finally {
      isLoading.value = false
    }
  })

  async function removeFromTeam (id: string) {
    try {
      isLoading.value = true

      if (!team.value) {
        return
      }

      await http.post('/one/team/remove', { userId: id })
      team.value.members = team.value.members.filter((member: VOneTeam['members'][number]) => member.id !== id)
    } catch (error: any) {
      queue.showError(error.message)
    } finally {
      isLoading.value = false
    }
  }

  async function leaveTeam () {
    try {
      isLoading.value = true

      await http.post('/one/team/leave', { teamId: team.value?.id })
      await auth.verify(true)
    } catch (error: any) {
      queue.showError(error.message)
    } finally {
      isLoading.value = false
    }
  }

  async function joinTeam () {
    try {
      isLoading.value = true

      await http.post('/one/team/join', { inviteCode: teamInviteCode.value })
      await auth.verify(true)

      clearTeamQuery()
    } catch (error: any) {
      queue.showError(error.message)
    } finally {
      isLoading.value = false
    }
  }

  function clearTeamQuery () {
    teamInviteDialog.value = false
    const url = new URL(window.location.href)
    url.searchParams.delete('invite')
    window.history.replaceState({}, '', url.toString())
  }

  const isTeamOwner = computed(() => {
    return auth.user?.id === auth.user?.team?.owner.id
  })

  return {
    team,
    teamInviteDialog,
    teamInviteCode,
    hasTeamAccess,
    isTeamOwner,
    isLoading,
    removeFromTeam,
    leaveTeam,
    joinTeam,
    clearTeamQuery,
  }
})
