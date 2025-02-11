import { supabase } from '@lib/supabaseClient'
import type { 
  AuthResponse, 
  UserResponse, 
  OAuthResponse, 
  MagicLinkResponse,
  User, 
  Profile,
  ApiResponse
} from '@/types/database.types'

export class AuthService {
  // Email/Password Authentication
  async signUpWithEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await supabase.auth.signUp({
      email,
      password,
    })
    return response as AuthResponse
  }

  async signInWithEmail(email: string, password: string): Promise<AuthResponse> {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return response as AuthResponse
  }

  // Magic Link Authentication
  async signInWithMagicLink(email: string): Promise<MagicLinkResponse> {
    const response = await supabase.auth.signInWithOtp({
      email,
    })
    return response as MagicLinkResponse
  }

  // Phone Authentication
  async signUpWithPhone(phone: string, password: string): Promise<AuthResponse> {
    const response = await supabase.auth.signUp({
      phone,
      password,
    })
    return response as AuthResponse
  }

  async signInWithPhone(phone: string): Promise<MagicLinkResponse> {
    const response = await supabase.auth.signInWithOtp({
      phone,
    })
    return response as MagicLinkResponse
  }

  async verifyPhoneOTP(phone: string, token: string): Promise<AuthResponse> {
    const response = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms',
    })
    return response as AuthResponse
  }

  // OAuth Authentication
  async signInWithProvider(provider: 'github' | 'google' | 'facebook'): Promise<OAuthResponse> {
    const response = await supabase.auth.signInWithOAuth({
      provider,
    })
    return response as OAuthResponse
  }

  // User Management
  async getCurrentUser(): Promise<UserResponse> {
    const response = await supabase.auth.getUser()
    return response as UserResponse
  }

  async resetPassword(email: string): Promise<MagicLinkResponse> {
    const response = await supabase.auth.resetPasswordForEmail(email)
    return response as MagicLinkResponse
  }

  async updateUser(updates: {
    email?: string
    password?: string
    data?: Record<string, any>
  }): Promise<UserResponse> {
    const response = await supabase.auth.updateUser(updates)
    return response as UserResponse
  }

  async signOut(): Promise<{ error: Error | null }> {
    return await supabase.auth.signOut()
  }

  // Profile Management
  async getProfile(userId: string): Promise<ApiResponse<Profile>> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { data, error }
  }

  async updateProfile(
    userId: string,
    updates: Partial<Profile>
  ): Promise<ApiResponse<Profile>> {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .single()

    return { data, error }
  }
}
