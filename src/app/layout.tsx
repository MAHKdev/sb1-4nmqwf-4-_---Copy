import { ThemeProvider } from '@/components/ThemeProvider';
import { ChildProvider } from '@/contexts/ChildContext';
import { AuthProvider } from '@/components/AuthProvider';
import { MainNav } from '@/components/MainNav';
import { UserMenu } from '@/components/UserMenu';
import { ThemeSwitch } from '@/components/ThemeSwitch';
import ClientLayout from '@/components/ui/Layoutclient';
import { SyncProvider } from '@/components/SyncProvider';
import { Award } from 'lucide-react';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Kidodo',
  description: 'Motivation for a Lifetime',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <ChildProvider>
              <SyncProvider>
                <ClientLayout>
                  <div className="min-h-screen bg-base-100 pb-20">
                    <header className="navbar bg-base-200 shadow-sm">
                      <div className="navbar-start">
                        <div className="flex items-center gap-2 px-4">
                          <Award className="w-6 h-6 text-primary" />
                          <span className="text-xl font-bold">KidsReward</span>
                        </div>
                      </div>
                      <div className="navbar-end gap-2">
                        <ThemeSwitch />
                        <UserMenu />
                      </div>
                    </header>
                    <main className="container mx-auto px-4 py-8">
                      {children}
                    </main>
                    <MainNav />
                  </div>
                  </ClientLayout>
              </SyncProvider>
            </ChildProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}