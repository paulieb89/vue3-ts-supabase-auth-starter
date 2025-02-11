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

// Debug logging
console.log('Router initialized with auth checking enabled')

// Enhanced navigation guard with error handling and debug logs
router.beforeEach(async (to, from, next) => {
  console.log('Navigation guard triggered for path:', to.path)
  console.log('From path:', from.path)
  
  try {
    console.log('Attempting to get auth session...')
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting auth session:', error)
      throw error
    }
    
    console.log('Auth session result:', {
      exists: !!session,
      user: session?.user?.email,
      expiresAt: session?.expires_at
    })

    // Only check auth for routes that require it
    if (to.meta.requiresAuth && !session) {
      console.log('Auth required but no session, redirecting to login')
      next({ name: 'Auth', query: { redirect: to.fullPath } })
    } else {
      console.log('Proceeding with navigation, auth check passed')
      next()
    }
  } catch (err) {
    console.error('Navigation guard error:', err)
    // Proceed with navigation even if auth check fails
    console.log('Proceeding despite error')
    next()
  }
})

export default router
