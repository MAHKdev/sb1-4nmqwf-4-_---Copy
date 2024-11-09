'use client';

import { useEffect } from 'react';
import { useSync } from '@/hooks/useSync';

export function SyncProvider({ children }: { children: React.ReactNode }) {
  const { loadData, syncData, isAuthenticated } = useSync();

  useEffect(() => {
    if (isAuthenticated) {
      loadData().catch(console.error);
    }
  }, [isAuthenticated, loadData]);

  // Sync data when window is about to unload
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleBeforeUnload = () => {
      syncData().catch(console.error);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isAuthenticated, syncData]);

  return <>{children}</>;
}