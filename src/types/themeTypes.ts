export type CarbonThemeType = 'white' | 'g100';

export interface ThemeContextType {
  theme: CarbonThemeType;
  toggleTheme: () => void;
}

export interface ThemeConfigType {
  theme: CarbonThemeType;
  label: string;
  description: string;
}

export const CARBON_THEMES: ThemeConfigType[] = [
  { theme: 'white', label: 'White', description: 'Light theme' },
  { theme: 'g100', label: 'Gray 100', description: 'Dark theme' }
];