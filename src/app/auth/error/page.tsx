'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-error" />
          <h2 className="mt-6 text-3xl font-bold">Authentication Error</h2>
          <p className="mt-2 text-sm text-error">
            {error === 'AccessDenied' && 'You do not have permission to sign in.'}
            {error === 'Configuration' && 'There is a problem with the server configuration.'}
            {!error && 'An unknown error occurred.'}
          </p>
        </div>

        <div className="mt-8">
          <Link href="/" className="btn btn-primary w-full">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthErrorContent />
    </Suspense>
  );
}
