import { useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { supabase } from '@/lib/supabase';
import { useAppStore } from '@/store/useAppStore';
import { isDemoUser, getDemoData } from '@/lib/demoAuth';

export function useSync() {
  const { data: session } = useSession();
  const { children, contracts, penalties, activityLog } = useAppStore();

  const syncData = useCallback(async () => {
    if (!session?.user) return;

    try {
      // For demo user, sync to a specific demo table
      const tableName = isDemoUser(session.user.id) ? 'demo_user_data' : 'user_data';

      const { error } = await supabase
        .from(tableName)
        .upsert({
          user_id: session.user.id,
          content: {
            children,
            contracts,
            penalties,
            activityLog,
          },
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
    } catch (error) {
      console.error('Sync error:', error);
      throw error;
    }
  }, [session, children, contracts, penalties, activityLog]);

  const loadData = useCallback(async () => {
    if (!session?.user) return;

    try {
      if (isDemoUser(session.user.id)) {
        // Load demo data
        useAppStore.setState(getDemoData());
        return;
      }

      // Load real user data
      const { data, error } = await supabase
        .from('user_data')
        .select('content')
        .eq('user_id', session.user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "not found" errors
        throw error;
      }

      if (data?.content) {
        useAppStore.setState(data.content);
      }
    } catch (error) {
      console.error('Load error:', error);
      throw error;
    }
  }, [session]);

  return {
    syncData,
    loadData,
    isAuthenticated: !!session?.user,
    isDemoUser: session?.user ? isDemoUser(session.user.id) : false,
  };
}