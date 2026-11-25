// Pinia
import { createPinia, setActivePinia } from 'pinia'

// Stores
import { useBannersStore, type VOneBanner } from '../banners'
import { useSiteStore } from '../site'
import { useUserStore } from '../user'

function banner (slug: string, ignore_delay: boolean | null = null, priority = 0): VOneBanner {
  return {
    id: slug,
    status: 'published',
    created_at: '2026-11-01T00:00:00.000Z',
    modified_at: '2026-11-01T00:00:00.000Z',
    slug,
    title: slug,
    metadata: {
      active: true,
      closable: true,
      priority,
      color: '',
      label: '',
      height: 48,
      text: slug,
      subtext: '',
      link: '',
      link_text: '',
      link_color: '',
      attributes: {},
      start_date: '',
      end_date: '',
      bg_blur: null,
      ignore_delay,
      images: {
        bg: null,
        logo: null,
      },
      site: ['docs'],
    },
  }
}

describe('banners store', () => {
  beforeEach(() => {
    const memory = new Map<string, string>()
    vi.stubGlobal('localStorage', {
      getItem (key: string) {
        return memory.get(key) ?? null
      },
      setItem (key: string, value: string) {
        memory.set(key, value)
      },
      removeItem (key: string) {
        memory.delete(key)
      },
      clear () {
        memory.clear()
      },
    })

    setActivePinia(createPinia())
    const site = useSiteStore()
    site.id.push('docs')

    const user = useUserStore()
    user.one.banners.enabled = true
    user.one.banners.read = []
    user.one.banners.last = new Date().toISOString()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('hides a normal banner during the global cooldown', () => {
    const banners = useBannersStore()
    banners.all.push(banner('sale', null))

    expect(banners.banner).toBeUndefined()
  })

  it('shows an ignore_delay banner during the global cooldown', () => {
    const banners = useBannersStore()
    banners.all.push(
      banner('black-friday', true, 1),
      banner('sale', false, 10),
    )

    expect(banners.banner?.slug).toBe('black-friday')
  })

  it('keeps a dismissed ignore_delay banner hidden', () => {
    const user = useUserStore()
    user.one.banners.read.push('black-friday')

    const banners = useBannersStore()
    banners.all.push(banner('black-friday', true))

    expect(banners.banner).toBeUndefined()
  })

  it('keeps priority order when the cooldown is inactive', () => {
    const user = useUserStore()
    user.one.banners.last = ''

    const banners = useBannersStore()
    banners.all.push(
      banner('black-friday', true, 1),
      banner('sale', null, 10),
    )

    expect(banners.banner?.slug).toBe('sale')
  })
})
