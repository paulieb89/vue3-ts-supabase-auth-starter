/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Supabase
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  
  // API
  readonly VITE_API_URL: string
  readonly VITE_API_VERSION: string
  
  // App
  readonly VITE_APP_NAME: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_ENV: 'development' | 'staging' | 'production'
  
  // Features
  readonly VITE_ENABLE_ANALYTICS?: string
  readonly VITE_ENABLE_LOGGING?: string
  
  // External Services
  readonly VITE_STORAGE_URL?: string
  readonly VITE_CDN_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Ensure we don't use process.env
declare const process: undefined