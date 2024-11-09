import { supabase } from './supabase';
import { Child, Contract, Penalty } from '@/types';
import { initialChildren, contractTemplates, penaltyTemplates } from '@/data';

export const DEMO_USER = {
  id: 'demo-user-123',
  name: 'Demo User',
  email: 'demo@example.com',
  image: 'https://ui-avatars.com/api/?name=Demo+User',
};

// Demo data setup
export const DEMO_DATA = {
  children: initialChildren,
  contracts: contractTemplates.map((template, index) => ({
    ...template,
    id: `template-${index}`,
    childId: index % 2 === 0 ? initialChildren[0].id : initialChildren[1].id,
  })),
  penalties: penaltyTemplates.map((template, index) => ({
    ...template,
    id: `penalty-${index}`,
    childId: index % 2 === 0 ? initialChildren[0].id : initialChildren[1].id,
  })),
};

export async function signInDemo() {
  try {
    // Create or update demo user in Supabase
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert({
        id: DEMO_USER.id,
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (userError) throw userError;

    // Store demo data in a separate table
    await supabase
      .from('demo_user_data')
      .upsert({
        user_id: DEMO_USER.id,
        content: DEMO_DATA,
        updated_at: new Date().toISOString(),
      });

    return {
      ...DEMO_USER,
      accessToken: 'demo-token',
    };
  } catch (error) {
    console.error('Error setting up demo account:', error);
    throw error;
  }
}

export function isDemoUser(userId: string) {
  return userId === DEMO_USER.id;
}

export function getDemoData() {
  return DEMO_DATA;
}