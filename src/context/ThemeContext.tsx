import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
let AsyncStorage;
try {
  AsyncStorage = require('@react-native-async-storage/async-storage').default;
} catch (e) {
  // fallback - AsyncStorage may not be installed in this environment
  AsyncStorage = null;
}

import { getComponentSpecs } from '../styles/design-system/components';
import { getTheme, lightTheme } from '../styles/design-system/theme';
import { getTypography } from '../styles/design-system/typography';
import { LanguageProvider } from './LanguageContext';

const THEME_KEY = '@app:theme';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  
  // Design System exports
  colors: any;
  typography: any;
  componentStyles: any;
  
  // Legacy support
  components?: any;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  isDark: false,
  toggleTheme: async () => {},
  colors: lightTheme,
  typography: getTypography(lightTheme, 1),
  componentStyles: getComponentSpecs(lightTheme),
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [fontScale, setFontScale] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        let saved: string | null = null;
        if (AsyncStorage) saved = await AsyncStorage.getItem(THEME_KEY);
        const system = Appearance.getColorScheme();
        const initial = (saved || system || 'light') as 'light' | 'dark';
        applyTheme(initial);
      } catch (e) {
        const system = Appearance.getColorScheme();
        applyTheme((system || 'light') as 'light' | 'dark');
      }
    })();
  }, []);

  function applyTheme(name: 'light' | 'dark') {
    const n = name === 'dark' ? 'dark' : 'light';
    console.log('[ThemeContext] applyTheme ->', n);
    setTheme(n);
  }

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    console.log('[ThemeContext] toggleTheme ->', next);
    applyTheme(next);
    try {
      if (AsyncStorage) await AsyncStorage.setItem(THEME_KEY, next);
    } catch (e) {
      // ignore
    }
  };

  // Memoized design system computed from current theme
  const designSystem = useMemo(() => {
    const isDark = theme === 'dark';
    const colors = getTheme(isDark);
    const typography = getTypography(colors, fontScale);
    const componentStyles = getComponentSpecs(colors);

    return {
      colors,
      typography,
      componentStyles,
    };
  }, [theme, fontScale]);

  const value: ThemeContextValue = {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    colors: designSystem.colors,
    typography: designSystem.typography,
    componentStyles: designSystem.componentStyles,
    components: designSystem.componentStyles,
  };

  return (
    <ThemeContext.Provider value={value}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
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

export default ThemeContext;
