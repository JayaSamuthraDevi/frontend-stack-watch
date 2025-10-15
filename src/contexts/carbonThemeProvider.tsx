'use client';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode, useEffect } from 'react';

interface CarbonThemeProviderProps {
  children: ReactNode;
}

export const CarbonThemeProvider = ({ children }: CarbonThemeProviderProps) => {
  useEffect(() => {
    // Set initial theme attribute
    const savedTheme = sessionStorage.getItem('carbon-theme') || 'white';
    document.documentElement.setAttribute('data-carbon-theme', savedTheme);
  }, []);

  return (
    <NextThemeProvider
      attribute="data-carbon-theme"
      defaultTheme="system"
      themes={['white', 'g100']}
      enableSystem={false}
      storageKey="carbon-theme"
    >
      {children}
    </NextThemeProvider>
  );
};