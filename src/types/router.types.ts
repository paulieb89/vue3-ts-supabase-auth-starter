import 'vue-router'

// Extend Vue Router's RouteMeta interface
declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
    requiresUnauth?: boolean
    title?: string
    layout?: 'default' | 'auth' | 'blank'
  }
}

// Navigation types
export interface NavigationState {
  from: string
  to: string
}

// Route params types
export interface ProfileParams {
  id: string
}

// Query params types
export interface AuthQuery {
  redirect?: string
  mode?: 'signin' | 'signup'
}

// Breadcrumb types
export interface Breadcrumb {
  text: string
  to?: string
  disabled?: boolean
}

// Navigation guard types
export interface NavigationGuardContext {
  to: string
  from: string
  next: (to?: string) => void
}