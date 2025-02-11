import { ref, computed, onMounted } from 'vue'
import type { User, Profile } from '@/types/database.types'
import { supabase } from '@lib/supabaseClient'

const user = ref<User | null>(null)
const profile = ref<Profile | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  // Listen for auth changes
  onMounted(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      user.value = session?.user ?? null
      if (session?.user) {
        loadProfile(session.user.id)
      }
    })

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed in composable:', event, session?.user?.email)
      user.value = session?.user ?? null
      if (session?.user) {
        await loadProfile(session.user.id)
      } else {
        profile.value = null
      }
    })

    // Cleanup subscription
    return () => subscription.unsubscribe()
  })

  async function loadProfile(userId: string) {
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (err) throw err
      profile.value = data
    } catch (e) {
      console.error('Error loading profile:', e)
      error.value = e instanceof Error ? e.message : 'An error occurred'
    }
  }

  async function loadUser() {
    loading.value = true
    error.value = null
    try {
      const { data: { session }, error: err } = await supabase.auth.getSession()
      if (err) throw err
      
      user.value = session?.user ?? null
      if (session?.user) {
        await loadProfile(session.user.id)
      } else {
        profile.value = null
      }
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
    } finally {
      loading.value = false
    }
  }

  async function signUp(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signUp({
        email,
        password,
      })
      if (err) throw err
      await loadUser()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function signIn(email: string, password: string) {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (err) throw err
      await loadUser()
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function signInWithMagicLink(email: string) {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signInWithOtp({
        email,
      })
      if (err) throw err
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function signInWithProvider(provider: 'github' | 'google' | 'facebook') {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider,
      })
      if (err) throw err
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    loading.value = true
    error.value = null
    try {
      const { error: err } = await supabase.auth.signOut()
      if (err) throw err
      user.value = null
      profile.value = null
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(updates: Partial<Profile>) {
    if (!user.value) throw new Error('No user logged in')
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.value.id)
        .single()
      if (err) throw err
      profile.value = data
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'An error occurred'
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    user: computed(() => user.value),
    profile: computed(() => profile.value),
    loading: computed(() => loading.value),
    error: computed(() => error.value),
    isAuthenticated,
    loadUser,
    signUp,
    signIn,
    signInWithMagicLink,
    signInWithProvider,
    signOut,
    updateProfile,
  }
}
