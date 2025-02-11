<template>
  <div class="card">
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-lg">
      <!-- Avatar Upload -->
      <div class="flex flex-col items-center gap-md">
        <img
          v-if="form.avatar_url"
          :src="form.avatar_url"
          alt="Profile"
          class="avatar avatar-lg"
        />
        <div class="flex flex-col items-center">
          <label for="avatar" class="btn btn-primary">
            {{ form.avatar_url ? 'Change Photo' : 'Upload Photo' }}
          </label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            @change="handleAvatarChange"
            class="hidden"
          />
        </div>
      </div>

      <!-- Profile Information -->
      <div class="form-group">
        <label for="username" class="form-label">Username</label>
        <input
          id="username"
          v-model="form.username"
          type="text"
          class="form-input"
          :class="{ 'error': errors.username }"
          @input="validateUsername"
        />
        <span v-if="errors.username" class="form-error">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label for="full_name" class="form-label">Full Name</label>
        <input
          id="full_name"
          v-model="form.full_name"
          type="text"
          class="form-input"
          :class="{ 'error': errors.full_name }"
        />
        <span v-if="errors.full_name" class="form-error">{{ errors.full_name }}</span>
      </div>

      <div class="form-group">
        <label for="website" class="form-label">Website</label>
        <input
          id="website"
          v-model="form.website"
          type="url"
          class="form-input"
          :class="{ 'error': errors.website }"
          @input="validateWebsite"
        />
        <span v-if="errors.website" class="form-error">{{ errors.website }}</span>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-md">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="btn btn-secondary"
        >
          Cancel
        </button>
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="loading || hasErrors"
        >
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </form>

    <!-- Notifications -->
    <div 
      v-if="notification" 
      :class="[
        'alert',
        `alert-${notification.type}`,
        'fixed bottom-md right-md'
      ]"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { profileApi } from '@lib/profileApi'
import type { Profile } from '@types/database.types'
import { useAuth } from '@composables/useAuth'

const props = defineProps<{
  initialProfile: Profile
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'saved', profile: Profile): void
}>()

const { user } = useAuth()

const form = ref({
  username: props.initialProfile.username || '',
  full_name: props.initialProfile.full_name || '',
  website: props.initialProfile.website || '',
  avatar_url: props.initialProfile.avatar_url || ''
})

const errors = ref({
  username: '',
  full_name: '',
  website: ''
})

const loading = ref(false)
const notification = ref<{ type: 'success' | 'error', message: string } | null>(null)

const hasErrors = computed(() => 
  Object.values(errors.value).some(error => error !== '')
)

function validateUsername() {
  if (form.value.username.length < 3) {
    errors.value.username = 'Username must be at least 3 characters'
  } else {
    errors.value.username = ''
  }
}

function validateWebsite() {
  if (form.value.website && !form.value.website.match(/^https?:\/\/.+\..+$/)) {
    errors.value.website = 'Please enter a valid URL'
  } else {
    errors.value.website = ''
  }
}

async function handleAvatarChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  loading.value = true
  try {
    const avatarUrl = await profileApi.uploadAvatar(file)
    form.value.avatar_url = avatarUrl
    notification.value = {
      type: 'success',
      message: 'Avatar uploaded successfully'
    }
  } catch (error) {
    notification.value = {
      type: 'error',
      message: 'Failed to upload avatar'
    }
  } finally {
    loading.value = false
  }
}

async function handleSubmit() {
  if (hasErrors.value) return

  loading.value = true
  try {
    const { data, error } = await profileApi.updateProfile({
      ...form.value,
      id: props.initialProfile.id
    })

    if (error) throw error

    notification.value = {
      type: 'success',
      message: 'Profile updated successfully'
    }

    if (data) {
      emit('saved', data)
    }
  } catch (error) {
    notification.value = {
      type: 'error',
      message: 'Failed to update profile'
    }
  } finally {
    loading.value = false
  }
}
</script>
