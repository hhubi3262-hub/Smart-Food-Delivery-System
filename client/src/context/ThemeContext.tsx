import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { FiSun, FiMoon, FiDroplet, FiSunrise, FiFeather, FiCoffee } from 'react-icons/fi';

export type ThemeMode = 'light' | 'dark' | 'ocean' | 'sunset' | 'forest' | 'coffee';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  themes: {
    name: ThemeMode;
    label: string;
    icon: any;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
  }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  {
    name: 'light' as ThemeMode,
    label: 'Bright Mode',
    icon: FiSun,
    colors: {
      primary: '#d97706',
      secondary: '#0284c7',
      background: '#ffffff',
      text: '#1f2937'
    }
  },
  {
    name: 'dark' as ThemeMode,
    label: 'Night Mode',
    icon: FiMoon,
    colors: {
      primary: '#f59e0b',
      secondary: '#06b6d4',
      background: '#1f2937',
      text: '#f3f4f6'
    }
  },
  {
    name: 'ocean' as ThemeMode,
    label: 'Ocean Blue',
    icon: FiDroplet,
    colors: {
      primary: '#0891b2',
      secondary: '#06b6d4',
      background: '#f0f9ff',
      text: '#0c4a6e'
    }
  },
  {
    name: 'sunset' as ThemeMode,
    label: 'Sunset Orange',
    icon: FiSunrise,
    colors: {
      primary: '#ea580c',
      secondary: '#f59e0b',
      background: '#fff7ed',
      text: '#7c2d12'
    }
  },
  {
    name: 'forest' as ThemeMode,
    label: 'Forest Green',
    icon: FiFeather,
    colors: {
      primary: '#059669',
      secondary: '#10b981',
      background: '#f0fdf4',
      text: '#14532d'
    }
  },
  {
    name: 'coffee' as ThemeMode,
    label: 'Coffee Brown',
    icon: FiCoffee,
    colors: {
      primary: '#78350f',
      secondary: '#92400e',
      background: '#fef3c7',
      text: '#451a03'
    }
  }
];

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as ThemeMode) || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    
    const currentTheme = themes.find(t => t.name === theme);
    if (currentTheme) {
      root.style.setProperty('--color-primary', currentTheme.colors.primary);
      root.style.setProperty('--color-secondary', currentTheme.colors.secondary);
      root.style.setProperty('--color-background', currentTheme.colors.background);
      root.style.setProperty('--color-text', currentTheme.colors.text);
      
      // Apply theme class to body
      document.body.className = `theme-${theme}`;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
