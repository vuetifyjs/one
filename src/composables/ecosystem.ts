export interface EcosystemAction {
  id: string
  name: string
  description: string
  href: string
  icon: string
}

export const ECOSYSTEM_ACTIONS: EcosystemAction[] = [
  {
    id: 'play',
    name: 'Vuetify Play',
    description: 'Interactive component playground',
    href: 'https://play.vuetifyjs.com',
    icon: '$vuetify-play',
  },
  {
    id: 'bin',
    name: 'Vuetify Bin',
    description: 'Save and share code snippets',
    href: 'https://bin.vuetifyjs.com',
    icon: '$vuetify-bin',
  },
  {
    id: 'studio',
    name: 'Vuetify Studio',
    description: 'Visual theme builder',
    href: 'https://studio.vuetifyjs.com',
    icon: '$vuetify-studio',
  },
  {
    id: 'snips',
    name: 'Vuetify Snips',
    description: 'Copy-paste component templates',
    href: 'https://snips.vuetifyjs.com',
    icon: '$vuetify-snips',
  },
  {
    id: 'link',
    name: 'Vuetify Link',
    description: 'Short URL generator',
    href: 'https://link.vuetifyjs.com',
    icon: '$vuetify-link',
  },
  {
    id: 'issues',
    name: 'Vuetify Issues',
    description: 'Bug tracker and feature requests',
    href: 'https://issues.vuetifyjs.com',
    icon: '$vuetify-issues',
  },
  {
    id: 'store',
    name: 'Vuetify Store',
    description: 'Premium themes and templates',
    href: 'https://store.vuetifyjs.com',
    icon: '$vuetify-store',
  },
]

export function useEcosystem () {
  const user = useUserStore()

  const pinned = toRef(() => {
    return ECOSYSTEM_ACTIONS.filter(a => user.one.ecosystem.pinned.includes(a.id))
  })

  // Clear pinned items when quicklinks is disabled
  watch(() => user.one.quicklinks, val => {
    if (!val && user.one.ecosystem.pinned.length > 0) {
      user.one.ecosystem.pinned = []
    }
  })

  function isPinned (id: string) {
    return user.one.ecosystem.pinned.includes(id)
  }

  function togglePin (id: string) {
    const index = user.one.ecosystem.pinned.indexOf(id)
    if (index === -1) {
      user.one.ecosystem.pinned.push(id)
      if (!user.one.quicklinks) {
        user.one.quicklinks = true
      }
    } else {
      user.one.ecosystem.pinned.splice(index, 1)
    }
  }

  return {
    actions: ECOSYSTEM_ACTIONS,
    pinned,
    isPinned,
    togglePin,
  }
}
