'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider defaultTheme="kiddo" themes={['kiddo', 'cupcake', 'fantasy', 'garden', 'retro']} attribute="data-theme">
      {children}
    </NextThemesProvider>
  );
}