import { supabase } from '@lib/supabaseClient'
import type { Profile, ApiResponse, User } from '@/types/database.types'

export const profileApi = {
  async getProfile(userId: string): Promise<ApiResponse<Profile>> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()

    return { data, error }
  },

  async updateProfile(profile: Partial<Profile>): Promise<ApiResponse<Profile>> {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      return { data: null, error: new Error('No user logged in') }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(profile)
      .eq('id', userData.user.id)
      .single()

    return { data, error }
  },

  async uploadAvatar(file: File): Promise<string> {
    const { data: userData } = await supabase.auth.getUser()
    if (!userData?.user) {
      throw new Error('No user logged in')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${userData.user.id}-${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath)

    return data.publicUrl
  }
}
