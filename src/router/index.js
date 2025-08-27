import { useAuthStore } from '@/stores/auth'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/app',
      name: 'app',
      component: () => import('../views/AppView.vue'),
      props: (route) => ({ name: route.params.name }),
    },
  ],
})

router.beforeEach(async (to, from) => {
  const store = useAuthStore()
  const { isAuthenticated } = store

  if (to.name !== 'login' && !isAuthenticated) {
    return { name: 'login' }
  }

  if (to.name === 'login' && isAuthenticated) {
    return { name: 'app' }
  }
})

export default router
