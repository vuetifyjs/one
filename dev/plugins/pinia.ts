// Utilities
import { createPinia } from 'pinia'
import { one } from '@'

const pinia = createPinia()

pinia.use(
  one(
    ['one'],
    import.meta.env.VITE_API_SERVER_URL,
  ),
)

export default pinia
