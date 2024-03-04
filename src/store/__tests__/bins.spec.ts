import { createPinia, setActivePinia } from 'pinia'
import { useBinsStore } from '../bins'

describe('http store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('can create a bin', () => {
    const bins = useBinsStore()
  })
})
