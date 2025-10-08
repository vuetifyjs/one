// eslint-disable-next-line import/no-duplicates
import { createRouter, createWebHistory } from 'vue-router'
// eslint-disable-next-line import/no-duplicates
import { routes } from 'vue-router/auto-routes'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  await auth.verify()

  const isAuthenticated = !!auth.user

  if (!isAuthenticated && to.path !== '/login') {
    return next('/login')
  }

  if (isAuthenticated && to.path !== '/user/dashboard') {
    return next({
      path: '/user/dashboard',
      query: to.query,
    })
  }

  return next()
})

export default router
