// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: (routes: any) => setupLayouts(routes),
})

export default router
