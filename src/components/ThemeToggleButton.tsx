
'use client';
import React from 'react';
import { Toggle } from '@carbon/react';
import { useCarbonTheme } from '@/hooks/useCarbonTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme, mounted } = useCarbonTheme();
  if (!mounted) {
    return <div className="cds--skeleton" style={{ width: '48px', height: '24px' }} />;
  }

  const isDark = theme === 'g100';

  const handleToggle = (checked: boolean) => {
    setTheme(checked ? 'g100' : 'white');
  };

  return (
    <Toggle
      id="theme-toggle"
      labelText={isDark ?"Dark mode":'Light mode'}
      hideLabel
      toggled={isDark}
      onToggle={handleToggle}
      size="sm"
    />
  );
};