<template>
  <div class="container py-2xl">
    <!-- Hero Section -->
    <section class="hero">
      <h1 class="text-4xl font-bold text-text mb-lg">
        Welcome to Your Application
      </h1>
      <p class="text-lg text-text-light mb-xl max-w-2xl mx-auto">
        A Vue 3 + TypeScript starter template with Supabase authentication and comprehensive documentation
      </p>
      <div class="flex justify-center gap-md">
        <router-link 
          v-if="!isAuthenticated" 
          to="/auth" 
          class="btn btn-primary"
        >
          Get Started
        </router-link>
        <router-link 
          v-else 
          to="/profile" 
          class="btn btn-outline"
        >
          View Profile
        </router-link>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-2xl">
      <h2 class="text-2xl font-semibold text-center mb-2xl">
        Template Features
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-xl max-w-6xl mx-auto">
        <!-- Authentication -->
        <div class="card feature-card">
          <h3 class="text-xl font-semibold text-primary">
            Authentication Ready
          </h3>
          <p class="text-text-light">
            Complete authentication system with multiple providers and profile management
          </p>
        </div>
        
        <!-- Type Safety -->
        <div class="card feature-card">
          <h3 class="text-xl font-semibold text-primary">
            Type Safety
          </h3>
          <p class="text-text-light">
            Full TypeScript support with comprehensive type definitions
          </p>
        </div>
        
        <!-- Component System -->
        <div class="card feature-card">
          <h3 class="text-xl font-semibold text-primary">
            Component System
          </h3>
          <p class="text-text-light">
            Reusable components and composables for rapid development
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@composables/useAuth'

const { isAuthenticated } = useAuth()
</script>
