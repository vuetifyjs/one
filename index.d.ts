import type { Pinia } from 'pinia'
import type { App } from 'vue'

export function install (app: App): void
export function useAuthStore(pinia: Pinia): any
export function useOneStore(pinia: Pinia): any
export function useUserStore(pinia: Pinia): any
