import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@lib/supabaseClient'

// Route Components
import Home from '@views/Home.vue'
import ProfilePage from '@views/profile/ProfilePage.vue'
import AuthPage from '@views/auth/AuthPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfilePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Simplified navigation guard
router.beforeEach(async (to, from, next) => {
  console.log('Navigation to:', to.path)
  const { data: { session } } = await supabase.auth.getSession()
  console.log('Auth session:', session ? 'exists' : 'none')

  // Only check auth for routes that require it
  if (to.meta.requiresAuth && !session) {
    console.log('Auth required, redirecting to login')
    next({ name: 'Auth', query: { redirect: to.fullPath } })
  } else {
    console.log('Proceeding with navigation')
    next()
  }
})

export default router
