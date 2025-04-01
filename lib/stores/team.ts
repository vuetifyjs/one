// Composables
import { useQuery } from '@/composables/route'

// Stores
import { useAuthStore } from '@/stores/auth'
import { useHttpStore } from '@/stores/http'
import { useOneStore } from '@/stores/one'

export type Team = {
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

export const useTeamStore = defineStore('team', () => {
  const query = useQuery<{ invite: string }>()

  const auth = useAuthStore()
  const one = useOneStore()
  const http = useHttpStore()
  const queue = useQueueStore()

  const team = ref<Team | null>(null)
  const teamInviteDialog = ref<boolean>(false)
  const teamInviteCode = computed<string>(() => query.value.invite)

  const hasTeamAccess = computed(() =>
    team.value && one.access.some((access: string) => ['one/team', 'snips/team'].includes(access))
  )

  watch(teamInviteCode, async () => {
    if (!teamInviteCode.value) return
    if (!auth.user) { auth.dialog = true }

    try {
      const res = await http.get(`/one/team/${teamInviteCode.value}`)
      team.value = res.team
      teamInviteDialog.value = true
    } catch (e: any) {
      queue.showError(e.message)
      clearTeamQuery()
    }
  })

  async function removeFromTeam () {
    try {
      const res = await http.post('/one/team/remove', { userId: auth.user?.id })
      team.value = res.team
    } catch (e:any) {
      queue.showError(e.message)
    }
  }

  async function leaveTeam () {
    try {
      await http.post('/one/team/leave', { teamId: team.value?.id })
      await auth.verify(true)
    } catch (e:any) {
      queue.showError(e.message)
    }
  }

  async function joinTeam () {
    try {
      await http.post('/one/team/join', { inviteCode: teamInviteCode.value })
      await auth.verify(true)
      clearTeamQuery()
    } catch (e: any) {
      queue.showError(e.message)
    } finally {
      clearTeamQuery()
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
    removeFromTeam,
    leaveTeam,
    joinTeam,
    clearTeamQuery,
  }
})
