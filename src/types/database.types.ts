import type { User as SupabaseUser, Session as SupabaseSession } from '@supabase/supabase-js'

export interface Profile {
    id: string;
    updated_at: string;
    username: string | null;
    full_name: string | null;
    avatar_url: string | null;
    website: string | null;
    email: string | null;
}

// Extend Supabase's User type
export type User = SupabaseUser

// Extend Supabase's Session type
export type Session = SupabaseSession

// Generic response type
export interface ApiResponse<T> {
    data: T | null;
    error: Error | null;
}

// Auth responses
export interface AuthResponse extends ApiResponse<{
    user: User | null;
    session: Session | null;
}> {}

export interface UserResponse extends ApiResponse<{
    user: User;
}> {}

export interface OAuthResponse extends ApiResponse<{
    provider: string;
    url: string;
}> {}

export interface MagicLinkResponse extends ApiResponse<{}> {}

// Profile responses
export interface ProfileResponse extends ApiResponse<Profile> {}

// Helper type for partial updates
export type ProfileUpdate = Partial<Profile>

// Database schema types
export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: Profile;
                Insert: Omit<Profile, 'id' | 'updated_at'>;
                Update: Partial<Profile>;
            };
        };
        Views: {
            [key: string]: {
                Row: Record<string, unknown>;
            };
        };
        Functions: {
            [key: string]: unknown;
        };
        Enums: {
            [key: string]: unknown;
        };
    };
}
