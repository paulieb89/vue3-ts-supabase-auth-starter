import type { Profile } from './database.types'

// Profile component types
export interface ProfileDisplayProps {
  profile: Profile
}

export interface ProfileEditProps {
  initialProfile: Profile
}

export interface ProfileEmits {
  (e: 'updated', profile: Profile): void
  (e: 'cancel'): void
}

// Common component types
export interface LoadingProps {
  loading: boolean
  text?: string
}

export interface ErrorProps {
  error: string | null
}

// Form types
export interface FormField {
  value: string
  error: string | null
  required?: boolean
  validator?: (value: string) => string | null
}

export interface FormState {
  [key: string]: FormField
}

// Button types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}