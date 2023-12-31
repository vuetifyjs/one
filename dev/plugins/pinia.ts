import { createPinia } from 'pinia'

const pinia = createPinia()

pinia.use(({ store }) => {
  store.url = import.meta.env.VITE_API_SERVER_URL
})

export default pinia
