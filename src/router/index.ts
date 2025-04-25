// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:generated-layouts'

import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: setupLayouts(routes),
})

router.beforeEach(async (to, from, next) => {
  if (from.matched.length > 0 && to.path === from.path) {
    return next()
  }
  const auth = useAuthStore()

  await auth.verify()

  if (
    auth.user
    && to.meta.requiresAdmin
    && !auth.user?.isAdmin
  ) {
    next({ path: '/401' })
  } else if (to.meta.requiresAuth && !auth.user) {
    next({ path: '/' })
  } else if (
    auth.user
    && !to.meta.requiresAuth
    && !to.meta.guest
    && to.path !== '/user/dashboard/'
  ) {
    // Passing query to not reset it on reroute for team invites
    next({ path: '/user/dashboard/', query: to.query })
  } else {
    next()
  }
})

export default router
