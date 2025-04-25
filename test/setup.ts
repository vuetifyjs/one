import { vi } from 'vitest'

globalThis.fetch = vi.fn(() => Promise.resolve({
  json: () => Promise.resolve({ /* Mocked response */ }),
})) as any
