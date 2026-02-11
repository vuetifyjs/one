import { vi } from 'vitest'

// Mock fetch globally to prevent unhandled rejections during store initialization
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  status: 200,
  json: () => Promise.resolve({ user: null, access: [] }),
}))

// Mock location
vi.stubGlobal('location', {
  hostname: 'localhost',
  href: 'http://localhost',
  assign: vi.fn(),
})

// Mock window.open
vi.stubGlobal('open', vi.fn().mockReturnValue({
  location: { href: '' },
  closed: false,
  close: vi.fn(),
  postMessage: vi.fn(),
}))
