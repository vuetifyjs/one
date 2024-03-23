// Pinia
import { createPinia, setActivePinia } from 'pinia'

// Stores
import { useBinsStore } from '../bins'
import { useHttpStore } from '../http'

import { bin } from '../__mocks__/bin'

describe('http store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('has loading state when making requests', async () => {
    const bins = useBinsStore()

    expect(bins.isLoading).toBe(false)

    const res = bins.get()

    expect(bins.isLoading).toBe(true)

    return res.then(() => {
      expect(bins.isLoading).toBe(false)
    })
  })

  it('gets and sets the current bin by id', () => {
    const http = useHttpStore()

    vi.spyOn(http, 'get').mockResolvedValue({ bin })

    const bins = useBinsStore()

    const res = bins.find('1')

    return res.then(() => {
      expect(bins.current).toEqual(bin)
    })
  })

  it('creates a new bin and sets it as current', () => {
    const http = useHttpStore()

    vi.spyOn(http, 'post').mockResolvedValue({ bin })

    const bins = useBinsStore()

    const res = bins.create(bin)

    return res.then(() => {
      expect(bins.current).toEqual(bin)
    })
  })

  it('updates an existing record in all bins', () => {
    const http = useHttpStore()

    vi.spyOn(http, 'post').mockResolvedValue({ bin })

    const bins = useBinsStore()

    bins.all.push(...[bin, { ...bin, content: 'Bin 2', id: '2' }])

    const res = bins.update(bin, '2')

    return res.then(() => {
      expect(bins.all[1].content).toBe('Bin content')
    })
  })
})
