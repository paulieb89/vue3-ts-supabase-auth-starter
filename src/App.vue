<template>
  <DefaultLayout v-if="!loading">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </DefaultLayout>
  <div v-else class="loading-screen">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useAuth } from '@/composables/useAuth'

const { loadUser } = useAuth()
const loading = ref(true)

onMounted(async () => {
  try {
    await loadUser()
  } finally {
    loading.value = false
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--transition-fast);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.loading-screen {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
