import React, { createContext, useContext, useMemo } from 'react';
import { useInitializeTheme } from '../hooks/useInitializeTheme';
import { getComponentSpecs } from '../styles/design-system/components';
import { getTheme, lightTheme } from '../styles/design-system/theme';
import { getTypography } from '../styles/design-system/typography';
import { LanguageProvider } from './LanguageContext';

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
  const { theme, fontScale, toggleTheme } = useInitializeTheme();

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
