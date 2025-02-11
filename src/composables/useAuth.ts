import { ref, computed } from 'vue'
import { AuthService } from '@lib/authService'
import type { User, Profile } from '@/types/database.types'

const authService = new AuthService()
const user = ref<User | null>(null)
const profile = ref<Profile | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => !!user.value)

  async function loadUser() {
    loading.value = true
    error.value = null
    try {
      const { data, error: err } = await authService.getCurrentUser()
      if (err) throw err
      if (!data?.user) {
        user.value = null
        profile.value = null
        return
      }
      
      user.value = data.user
      const { data: profileData, error: profileErr } = await authService.getProfile(data.user.id)
      if (profileErr) throw profileErr
      profile.value = profileData
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
      const { error: err } = await authService.signUpWithEmail(email, password)
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
      const { error: err } = await authService.signInWithEmail(email, password)
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
      const { error: err } = await authService.signInWithMagicLink(email)
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
      const { error: err } = await authService.signInWithProvider(provider)
      if (err) throw err
      await loadUser()
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
      const { error: err } = await authService.signOut()
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
      const { data, error: err } = await authService.updateProfile(user.value.id, updates)
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
