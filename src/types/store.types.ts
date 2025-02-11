import type { Profile, User } from './database.types'

// Auth store types
export interface AuthState {
  user: User | null
  profile: Profile | null
  loading: boolean
  error: string | null
}

// UI store types
export interface UIState {
  theme: 'light' | 'dark' | 'system'
  sidebarOpen: boolean
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  message: string
  duration?: number
  read?: boolean
}

// Settings store types
export interface SettingsState {
  preferences: UserPreferences
  features: FeatureFlags
}

export interface UserPreferences {
  emailNotifications: boolean
  pushNotifications: boolean
  language: string
  timezone: string
}

export interface FeatureFlags {
  analytics: boolean
  beta: boolean
  darkMode: boolean
}

// Generic store types
export interface StoreDefinition<T> {
  id: string
  state: () => T
  getters?: Record<string, (state: T) => any>
  actions?: Record<string, (state: T, payload?: any) => void | Promise<void>>
}