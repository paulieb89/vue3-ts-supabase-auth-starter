<template>
  <div class="container py-2xl">
    <div class="max-w-md mx-auto">
      <div class="card p-xl">
        <h2 class="text-2xl font-semibold text-center mb-lg">
          {{ authMode }}
        </h2>
        
        <!-- Error Alert -->
        <div v-if="error" class="alert alert-error mb-md">
          {{ error }}
        </div>

        <!-- Success Message -->
        <div v-if="successMsg" class="alert alert-success mb-md">
          {{ successMsg }}
        </div>

        <form @submit.prevent="handleSubmit" :class="{ 'opacity-70': loading }">
          <div class="form-group">
            <input
              type="email"
              v-model="email"
              placeholder="Your email"
              class="form-input"
              :disabled="loading"
            />
          </div>

          <div class="form-group">
            <input
              type="password"
              v-model="password"
              placeholder="Your password"
              class="form-input"
              :disabled="loading"
            />
          </div>

          <button 
            type="submit" 
            class="btn btn-primary w-full mb-md" 
            :disabled="loading"
          >
            <span v-if="!loading">{{ authMode }} with Email</span>
            <span v-else>Processing...</span>
          </button>

          <button 
            type="button"
            @click="toggleAuthMode" 
            class="text-primary text-center w-full hover:text-primary-dark"
            :class="{ 'opacity-50 cursor-not-allowed': loading }"
            :disabled="loading"
          >
            {{ authMode === 'Sign In' ? 'Need an account? Sign Up' : 'Already have an account? Sign In' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '@composables/useAuth'
import { useRouter } from 'vue-router'

const router = useRouter()
const { signIn, signUp, loading, error: authError } = useAuth()

const email = ref('')
const password = ref('')
const authMode = ref('Sign In')
const successMsg = ref('')

// Clear success message after 5 seconds
const clearSuccessMessage = () => {
  setTimeout(() => {
    successMsg.value = ''
  }, 5000)
}

const handleSubmit = async () => {
  if (loading.value) return

  try {
    if (authMode.value === 'Sign In') {
      await signIn(email.value, password.value)
      router.push('/')
    } else {
      await signUp(email.value, password.value)
      successMsg.value = 'Please check your email to confirm your account!'
      email.value = ''
      password.value = ''
      clearSuccessMessage()
    }
  } catch (e) {
    // Error is handled by useAuth composable
    clearSuccessMessage()
  }
}

const toggleAuthMode = () => {
  if (loading.value) return
  authMode.value = authMode.value === 'Sign In' ? 'Sign Up' : 'Sign In'
}

// Use the error from useAuth composable
const error = computed(() => authError.value)
</script>