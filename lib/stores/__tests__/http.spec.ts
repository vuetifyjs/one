import { createPinia, setActivePinia } from 'pinia'
import { useHttpStore } from '../http'

describe('http store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can make a get request', () => {
    const http = useHttpStore()

    expect(http.get('url')).resolves.toEqual({})
  })

  it('can make a post request', () => {
    const http = useHttpStore()

    expect(http.post('url')).resolves.toEqual({})
  })

  it('can make a delete request', () => {
    const http = useHttpStore()

    expect(http.delete('url')).resolves.toEqual({})
  })

  it('can make a fetch request', () => {
    const http = useHttpStore()

    expect(http.fetch('url')).resolves.toEqual({})
  })
})
