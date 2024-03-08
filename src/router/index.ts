// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: (routes: any) => setupLayouts(routes),
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  // Redirect to login if not authenticated
  if (to.meta.requiresAuth && !auth.user) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
