import { supabase } from '../lib/supabase/client';
import type { UserData } from '../types/quiz';

export const userService = {
  async createUser(userData: UserData) {
    // Ensure gender and ageGroup have default values if null
    const gender = userData.gender || 'unspecified';
    const ageGroup = userData.ageGroup || 'unspecified';

    const { data, error } = await supabase
      .from('users')
      .insert({
        first_name: userData.firstName,
        last_name: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        gender: gender,
        age_group: ageGroup
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }

    return data;
  }
};