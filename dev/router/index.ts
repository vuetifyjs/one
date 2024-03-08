// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'

// Stores
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: (routes: any) => setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  await auth.verify()

  // Redirect to login if not authenticated
  if (to.meta.requiresAuth && !auth.user) {
    next({ path: '/' })
  } else if (
    !to.meta.guest &&
    auth.user &&
    to.name !== '/[...404]' &&
    to.name !== '/user.dashboard'
  ) {
    next({ path: '/user/dashboard/' })
  } else {
    next()
  }
})

export default router
