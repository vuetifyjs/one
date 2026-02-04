// Pinia
import { createPinia, setActivePinia } from 'pinia'

import { bin } from '../__mocks__/bin'
// Stores
import { useBinsStore } from '../bins'
import { useHttpStore } from '../http'

describe('bins store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('has loading state when fetching bins', async () => {
    const http = useHttpStore()
    vi.spyOn(http, 'get').mockResolvedValue({ bins: [bin] })

    const bins = useBinsStore()

    expect(bins.isLoading).toBe(false)

    const res = bins.index()

    expect(bins.isLoading).toBe(true)

    await res

    expect(bins.isLoading).toBe(false)
  })

  it('fetches and sets all bins', async () => {
    const http = useHttpStore()
    vi.spyOn(http, 'get').mockResolvedValue({ bins: [bin] })

    const bins = useBinsStore()

    await bins.index()

    expect(bins.all).toEqual([bin])
  })

  it('computes favorites from all bins', async () => {
    const bins = useBinsStore()
    bins.all.push(
      { ...bin, favorite: true },
      { ...bin, id: '2', favorite: false },
    )

    expect(bins.favorites).toHaveLength(1)
    expect(bins.favorites[0].favorite).toBe(true)
  })

  it('computes pinned from all bins', async () => {
    const bins = useBinsStore()
    bins.all.push(
      { ...bin, pinned: true },
      { ...bin, id: '2', pinned: false },
    )

    expect(bins.pinned).toHaveLength(1)
    expect(bins.pinned[0].pinned).toBe(true)
  })
})
