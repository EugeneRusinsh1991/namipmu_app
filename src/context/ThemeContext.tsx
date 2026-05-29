import React, { createContext, useContext, useMemo } from 'react';
import { useInitializeTheme } from '../hooks/useInitializeTheme';
import { ComponentSpecifications, getComponentSpecs } from '../styles/design-system/components';
import foundation, { type ShadowTokensGeometry } from '../styles/design-system/foundation';
import { getTheme, lightTheme, type SemanticTokens } from '../styles/design-system/theme';
import { getTypography, TypographyStyles } from '../styles/design-system/typography';
import { LanguageProvider } from './LanguageContext';

export interface ThemeContextValue {
  theme: 'light' | 'dark';
  isDark: boolean;
  toggleTheme: () => Promise<void>;
  
  // Design System exports
  colors: SemanticTokens;
  typography: TypographyStyles;
  componentStyles: ComponentSpecifications;
}

const defaultMergedTokens = { ...foundation, ...lightTheme } as any;

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'light',
  isDark: false,
  toggleTheme: async () => {},
  colors: lightTheme,
  typography: getTypography({ ...foundation, ...lightTheme } as any, 1),
  componentStyles: getComponentSpecs(defaultMergedTokens),
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme, fontScale, toggleTheme } = useInitializeTheme();

  const designSystem = useMemo(() => {
    const isDark = theme === 'dark';
    const colors = getTheme(isDark);
    const typography = getTypography(colors, fontScale);
    const mergedTokens = { ...foundation, ...(colors as any) } as any;
    mergedTokens.shadows = {
      standard: {
        ...foundation.shadows.standard,
        ...((mergedTokens.shadows as any)?.standard || {}),
      },
    } as ShadowTokensGeometry;
    // inject shadowColor into merged shadows if provided by theme
    const shadowColor = (colors as any).shadowColor as string | undefined;
    const borderDefault = (colors as any).borderDefault as string | undefined;
    const interactiveBorder = (colors as any).interactive?.border as string | undefined;
    if (mergedTokens.borders) {
      (mergedTokens.borders as any).colorDefault = borderDefault ?? interactiveBorder ?? (mergedTokens.borders as any).colorDefault;
    }
    if (mergedTokens.shadows && shadowColor) {
      (Object.keys(mergedTokens.shadows) as Array<keyof typeof mergedTokens.shadows>).forEach((k) => {
        (mergedTokens.shadows as any)[k] = { ...(mergedTokens.shadows as any)[k] || {}, shadowColor };
      });
    }
    const componentStyles = getComponentSpecs(mergedTokens);

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
