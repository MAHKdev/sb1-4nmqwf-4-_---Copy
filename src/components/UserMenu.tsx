'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { User, LogIn, Settings, CreditCard } from 'lucide-react';
import { LoginModal } from './auth/LoginModal';
import Link from 'next/link';

export function UserMenu() {
  const { data: session } = useSession();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleManageSubscription = async () => {
    try {
      const response = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error accessing billing portal:', error);
    }
  };

  if (session?.user) {
    return (
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img
              alt={session.user.name || 'User avatar'}
              src={session.user.image || `https://ui-avatars.com/api/?name=${session.user.name}`}
            />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52">
          <li className="menu-title px-4 py-2">
            <span className="font-semibold">{session.user.name}</span>
            <span className="text-xs opacity-70">{session.user.email}</span>
          </li>
          <li>
            <Link href="/settings" className="gap-2">
              <Settings className="w-4 h-4" />
              Settings
            </Link>
          </li>
          <li>
            <button onClick={handleManageSubscription} className="gap-2">
              <CreditCard className="w-4 h-4" />
              Billing
            </button>
          </li>
          <li>
            <button onClick={() => signOut()} className="text-error gap-2">
              <LogIn className="w-4 h-4" />
              Sign out
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowLoginModal(true)}
        className="btn btn-ghost btn-sm gap-2"
      >
        <LogIn className="w-4 h-4" />
        Sign in
      </button>

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}