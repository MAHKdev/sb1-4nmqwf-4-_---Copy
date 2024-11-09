'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Gift, Settings, LineChart, CheckSquare, Calendar } from 'lucide-react';

export function MainNav() {
  const pathname = usePathname();

  const links = [
    { href: '/home', icon: Home, label: 'Home' },
    { href: '/rewards', icon: Gift, label: 'Rewards' },
    { href: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { href: '/calendar', icon: Calendar, label: 'Calendar' },
    { href: '/growth', icon: LineChart, label: 'Growth' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-200 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-around">
        {links.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors
              ${pathname === href 
                ? 'text-primary' 
                : 'opacity-70 hover:opacity-100 hover:text-primary'
              }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}