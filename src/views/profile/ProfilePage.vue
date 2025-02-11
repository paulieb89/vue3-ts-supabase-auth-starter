<template>
  <div class="container py-xl">
    <div v-if="loading" class="text-center py-xl">
      <div class="spinner mx-auto"></div>
      <p class="mt-md text-text-light">Loading profile...</p>
    </div>
    
    <div v-else-if="error" class="alert alert-error">
      {{ error }}
    </div>
    
    <div v-else>
      <ProfileDisplay
        v-if="!isEditing"
        :profile="profile"
        @edit="isEditing = true"
      />
      <ProfileEdit
        v-else
        :initial-profile="profile"
        @cancel="isEditing = false"
        @saved="handleProfileUpdate"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@composables/useAuth'
import { profileApi } from '@lib/profileApi'
import ProfileDisplay from '@components/profile/ProfileDisplay.vue'
import ProfileEdit from '@components/profile/ProfileEdit.vue'
import type { Profile } from '@types/database.types'

const { user } = useAuth()
const profile = ref<Profile | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)
const isEditing = ref(false)

onMounted(async () => {
  if (!user.value) return
  
  try {
    const { data, error: apiError } = await profileApi.getProfile(user.value.id)
    if (apiError) throw apiError
    profile.value = data
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load profile'
  } finally {
    loading.value = false
  }
})

function handleProfileUpdate(updatedProfile: Profile) {
  profile.value = updatedProfile
  isEditing.value = false
}
</script>