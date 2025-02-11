// Generic API types
export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  meta?: ApiMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}

export interface ApiMeta {
  page?: number
  per_page?: number
  total?: number
}

// Pagination types
export interface PaginationParams {
  page?: number
  per_page?: number
  sort_by?: string
  sort_order?: 'asc' | 'desc'
}

// Common request/response types
export interface ApiRequestOptions {
  headers?: Record<string, string>
  params?: Record<string, string | number | boolean>
  timeout?: number
}

// Profile API types
export interface UpdateProfileRequest {
  username?: string
  full_name?: string
  avatar_url?: string
  website?: string
}

export interface UploadAvatarResponse {
  url: string
  path: string
}

// Auth API types
export interface SignInRequest {
  email: string
  password: string
}

export interface SignUpRequest extends SignInRequest {
  full_name?: string
}

export interface ResetPasswordRequest {
  email: string
}

export interface UpdatePasswordRequest {
  current_password: string
  new_password: string
}

// Error types
export type ValidationErrors = {
  [key: string]: string[]
}

export interface ApiValidationError extends ApiError {
  errors: ValidationErrors
}

// File upload types
export interface FileUploadResponse {
  url: string
  path: string
  mime_type: string
  size: number
}

export interface FileUploadRequest {
  file: File
  path?: string
  content_type?: string
  public?: boolean
}