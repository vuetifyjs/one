import { vi } from 'vitest'

global.fetch = vi.fn(() => Promise.resolve({
  ok: true,
  status: 200,
  text: () => Promise.resolve('{}'),
  json: () => Promise.resolve({}),
})) as any
