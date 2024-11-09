import React from 'react';
import Link from 'next/link';
import { Home, Gift, Settings, CheckSquare } from 'lucide-react';

interface BottomNavProps {
  currentPath: string;
}

export function BottomNav({ currentPath }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-around">
        <Link
          href="/home"
          className={`flex flex-col items-center p-2 rounded-lg transition-colors
            ${currentPath === '/home' 
              ? 'text-indigo-600' 
              : 'text-gray-500 hover:text-indigo-600'
            }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link
          href="/rewards"
          className={`flex flex-col items-center p-2 rounded-lg transition-colors
            ${currentPath === '/rewards'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
            }`}
        >
          <Gift className="w-6 h-6" />
          <span className="text-xs mt-1">Rewards</span>
        </Link>

        <Link
          href="/tasks"
          className={`flex flex-col items-center p-2 rounded-lg transition-colors
            ${currentPath === '/tasks'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
            }`}
        >
          <CheckSquare className="w-6 h-6" />
          <span className="text-xs mt-1">Tasks</span>
        </Link>

        <Link
          href="/settings"
          className={`flex flex-col items-center p-2 rounded-lg transition-colors
            ${currentPath === '/settings'
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
            }`}
        >
          <Settings className="w-6 h-6" />
          <span className="text-xs mt-1">Settings</span>
        </Link>
      </div>
    </nav>
  );
}