import { ref, shallowRef, readonly } from 'vue'
import { defineStore } from 'pinia'
import { useHttpStore } from './http'
import { useAuthStore } from './auth'

export type DeviceAuthStatus = 'idle' | 'pending' | 'authorized' | 'expired' | 'error'

export interface DeviceCode {
  code: string
  expiresAt: string
}

export const useDeviceStore = defineStore('auth-device', () => {
  const http = useHttpStore()
  const auth = useAuthStore()

  const deviceCode = ref<string | null>(null)
  const status = shallowRef<DeviceAuthStatus>('idle')
  const error = ref<string | null>(null)

  /**
   * Authorize a device code (called from the web UI after user authenticates)
   */
  async function authorize(code: string): Promise<boolean> {
    if (!auth.isAuthenticated) {
      error.value = 'Must be authenticated to authorize device'
      return false
    }

    try {
      status.value = 'pending'
      await http.post(`/auth/device/${code}/authorize`)
      status.value = 'authorized'
      return true
    } catch (err: any) {
      status.value = 'error'
      error.value = err.message
      return false
    }
  }

  /**
   * Get the status of a device code (used by the auth page to show status)
   */
  async function getStatus(code: string): Promise<DeviceAuthStatus> {
    try {
      const res = await http.get<{ status: DeviceAuthStatus }>(`/auth/device/${code}/status`)
      return res.status
    } catch {
      return 'error'
    }
  }

  function reset() {
    deviceCode.value = null
    status.value = 'idle'
    error.value = null
  }

  return {
    deviceCode: readonly(deviceCode),
    status: readonly(status),
    error: readonly(error),
    authorize,
    getStatus,
    reset,
  }
})

export type DeviceStore = ReturnType<typeof useDeviceStore>
