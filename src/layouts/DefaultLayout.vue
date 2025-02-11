<template>
  <div class="layout">
    <header class="header">
      <nav class="container flex justify-between items-center">
        <router-link to="/" class="logo">
          Vue3 Starter
        </router-link>
        <div class="nav-links">
          <router-link to="/" class="nav-link">Home</router-link>
          <template v-if="isAuthenticated">
            <router-link to="/profile" class="nav-link">Profile</router-link>
            <button @click="handleSignOut" class="nav-link">Sign Out</button>
          </template>
          <template v-else>
            <router-link to="/auth" class="nav-link">Sign In</router-link>
          </template>
        </div>
      </nav>
    </header>

    <main class="main">
      <div class="container">
        <slot />
      </div>
    </main>

    <footer class="footer">
      <div class="container text-center">
        <p class="text-sm text-text-light">
          &copy; {{ new Date().getFullYear() }} Vue3 Starter Template. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from '@composables/useAuth'
import { useRouter } from 'vue-router'

const { isAuthenticated, signOut } = useAuth()
const router = useRouter()

async function handleSignOut() {
  await signOut()
  router.push('/')
}
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  height: var(--header-height);
  background-color: var(--color-background);
  box-shadow: var(--shadow-sm);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: var(--z-index-fixed);
}

.logo {
  font-size: var(--font-size-xl);
  font-weight: 600;
  color: var(--color-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--spacing-lg);
  align-items: center;
}

.nav-link {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
}

button.nav-link {
  background: none;
  border: none;
  cursor: pointer;
  font: inherit;
  padding: 0;
}

.main {
  flex: 1;
  padding-top: calc(var(--header-height) + var(--spacing-xl));
  padding-bottom: var(--spacing-xl);
}

.footer {
  margin-top: auto;
  padding: var(--spacing-lg) 0;
  background-color: var(--color-background);
  border-top: 1px solid var(--color-border-light);
}

@media (max-width: 768px) {
  .nav-links {
    gap: var(--spacing-md);
  }
  
  .logo {
    font-size: var(--font-size-lg);
  }
}
</style>