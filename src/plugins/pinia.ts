// Utilities
import { createPinia } from 'pinia'
import { one } from '@/index'

const pinia = createPinia()

pinia.use(
  one(
    ['*'],
    import.meta.env.VITE_API_SERVER_URL,
  ),
)

export default pinia
