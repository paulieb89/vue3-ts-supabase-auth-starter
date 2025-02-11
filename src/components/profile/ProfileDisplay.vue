<template>
  <div class="card">
    <!-- Profile Header -->
    <div class="flex items-center gap-lg mb-lg">
      <div class="flex-shrink-0">
        <img
          :src="profile.avatar_url || '/default-avatar.png'"
          :alt="profile.full_name || 'Profile'"
          class="avatar avatar-lg"
        />
      </div>
      <div class="flex-1">
        <h2 class="text-2xl font-semibold text-text mb-sm">
          {{ profile.full_name || 'No name set' }}
        </h2>
        <p class="text-text-light">@{{ profile.username || 'username not set' }}</p>
      </div>
    </div>

    <!-- Profile Details -->
    <div class="border-t border-border-light pt-lg">
      <div class="flex flex-col gap-md">
        <div v-if="profile.website" class="flex items-center">
          <span class="text-text-light w-32">Website</span>
          <a 
            :href="profile.website" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="text-primary hover:text-primary-dark"
          >
            {{ profile.website }}
          </a>
        </div>
        <div class="flex items-center">
          <span class="text-text-light w-32">Email</span>
          <span>{{ profile.email }}</span>
        </div>
        <div class="flex items-center">
          <span class="text-text-light w-32">Member Since</span>
          <span>{{ formatDate(profile.created_at) }}</span>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end mt-lg">
      <button @click="$emit('edit')" class="btn btn-primary">
        Edit Profile
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Profile } from '@types/database.types'

defineProps<{
  profile: Profile
}>()

defineEmits<{
  (e: 'edit'): void
}>()

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>