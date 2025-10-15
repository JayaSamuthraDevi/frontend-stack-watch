'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { CarbonThemeType } from '../types/themeTypes';

export const useCarbonTheme = () => {
  const {  setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCarbonTheme(resolvedTheme as CarbonThemeType)
  }, []);

  const setCarbonTheme = (newTheme: CarbonThemeType) => {
    setTheme(newTheme);

    // Update CSS custom properties for Carbon
    document.documentElement.setAttribute('data-carbon-theme', newTheme);

    // Optional: Save to sessionStorage for persistence
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('carbon-theme', newTheme);
    }
  };

  const getCurrentTheme = (): CarbonThemeType => {
    if (!mounted) return 'white';
    return (resolvedTheme as CarbonThemeType) || 'white';
  };

  return {
    theme: getCurrentTheme(),
    setTheme: setCarbonTheme,
    mounted
  };
};
 