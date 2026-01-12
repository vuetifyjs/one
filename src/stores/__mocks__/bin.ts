import type { VOneBin } from '@/stores/bins'

export const bin: VOneBin = {
  id: '1',
  title: 'Test Bin',
  content: 'Bin content',
  favorite: false,
  pinned: false,
  owner: {
    id: '1',
    name: 'user',
    email: 'john@vuetifyjs.com',
  },
  visibility: 'public',
}
