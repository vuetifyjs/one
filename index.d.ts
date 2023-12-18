import type { App } from 'vue'

export { useAuthStore } from '@/store/auth'
export { useUserStore } from '@/store/user'
export { useOneStore } from '@/store/one'

export function install (app: App): void
export function createOne (): { install: typeof install }
