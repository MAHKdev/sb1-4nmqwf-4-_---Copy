'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Award } from 'lucide-react';
import { AuthButtons } from '@/components/auth/AuthButtons';

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      console.error('Authentication error:', error);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <Award className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold">Sign in to KidsReward</h2>
          <p className="mt-2 text-sm opacity-70">
            Sign in to sync your data across devices
          </p>
        </div>

        <div className="mt-8">
          <AuthButtons 
            callbackUrl={callbackUrl} 
            mode="page"
          />
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
