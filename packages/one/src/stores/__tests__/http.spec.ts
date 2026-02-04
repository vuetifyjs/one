import { createPinia, setActivePinia } from 'pinia'
import { useHttpStore } from '../http'

describe('http store', async () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can make a get request', () => {
    const http = useHttpStore()

    return expect(http.get('url')).resolves.toEqual({})
  })

  it('can make a post request', () => {
    const http = useHttpStore()

    return expect(http.post('url')).resolves.toEqual({})
  })

  it('can make a delete request', () => {
    const http = useHttpStore()

    return expect(http.delete('url')).resolves.toEqual({})
  })

  it('can make a fetch request', () => {
    const http = useHttpStore()

    return expect(http.fetch('url')).resolves.toEqual({})
  })
})
