// Re-export all types
export * from './api.types'
export * from './components.types'
export * from './database.types'
export * from './router.types'
export * from './store.types'

// Utility types
export type Nullable<T> = T | null

export type Optional<T> = T | undefined

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

export type AsyncReturnType<T extends (...args: any) => Promise<any>> = 
  T extends (...args: any) => Promise<infer R> ? R : any

export type ValueOf<T> = T[keyof T]

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

// Function types
export type AsyncFunction<T = void> = () => Promise<T>

export type ErrorCallback = (error: Error) => void

export type SuccessCallback<T = void> = (data: T) => void

// Event types
export interface CustomEvent<T = any> {
  type: string
  payload?: T
}

export type EventHandler<T = any> = (event: CustomEvent<T>) => void

// Common types
export interface Dimensions {
  width: number
  height: number
}

export interface Coordinates {
  x: number
  y: number
}

export interface TimeRange {
  start: Date
  end: Date
}

export interface DateRange {
  startDate: string
  endDate: string
}

// Status types
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export type Status = 'active' | 'inactive' | 'pending' | 'archived'

export type Priority = 'low' | 'medium' | 'high' | 'urgent'

// Comment for developers
/**
 * This file exports all types from the types directory and provides common utility types.
 * Import types from here instead of individual files:
 * 
 * ```typescript
 * import type { Profile, ApiResponse, LoadingState } from '@/types'
 * ```
 * 
 * Add new utility types here if they are used across multiple components.
 * Add specific types to their respective domain files (api.types.ts, store.types.ts, etc.)
 */