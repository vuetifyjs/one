export interface VOneSponsorship {
  id: string
  platform: string
  interval: 'month' | 'year' | 'once'
  target: string
  tierName: string
  amount: number
  isActive: boolean
  createdAt: Date
}

export interface VOneIdentity {
  id: string
  emails: string[]
  provider: string
  userId: string
  userHandle: string
  primary: boolean
}

export type VOneRole = 'super' | 'admin' | 'editor' | 'user'

export interface VOneTeamMember {
  id: string
  name: string
  picture: string
}

export interface VOneTeam {
  id: string
  name: string
  inviteCode?: string
  members?: VOneTeamMember[]
  owner?: VOneTeamMember
  createdAt?: string
}

export interface VOneUser {
  id: string
  isAdmin: boolean
  role: VOneRole
  name: string
  shortid: string
  picture: string
  settings: Record<string, any> | null
  createdAt: string
  identities: VOneIdentity[]
  sponsorships: VOneSponsorship[]
  team: VOneTeam
}

export interface VOneAccessToken {
  id: string
  apiKey: string
  createdAt: string
  updatedAt: string
}

export type AuthProvider = 'github' | 'discord' | 'shopify' | 'google' | 'opencollective'

export interface AuthConfig {
  /** Base URL for the Vuetify API */
  apiUrl: string
}

export interface AuthVerifyResponse {
  user: VOneUser | null
  access: string[]
}

export interface AuthCallbacks {
  /** Called after successful login/verify with user and access data */
  onAuth?: (response: AuthVerifyResponse) => void
  /** Called on auth errors */
  onError?: (error: Error) => void
}
