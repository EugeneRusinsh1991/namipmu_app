/**
 * useDesignTokens Hook
 * 
 * Хук для удобного доступа к дизайн-токенам из компонентов.
 * Возвращает токены, спецификации компонентов и информацию о теме.
 * 
 * Использование:
 * const { tokens, specs, theme } = useDesignTokens();
 * 
 * // Применение в компоненте:
 * <Pressable style={{ 
 *   height: specs.button.primary.height,
 *   backgroundColor: tokens.interactive.accent,
 *   borderRadius: tokens.borders.radiusMd,
 * }} />
 */

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
    getComponentSpecs,
    type ComponentSpecifications,
    type SemanticTokens,
} from '../styles/design-system';
import type { TypographyStyles } from '../styles/design-system/typography';

/**
 * Полный набор дизайн-токенов и спецификаций
 */
export interface DesignTokensHookReturn {
  /** Семантические токены (цвета, типография, отступы, размеры) */
  tokens: SemanticTokens & { typography: TypographyStyles };
  
  /** Спецификации компонентов (Button, Card, Input, etc.) */
  specs: ComponentSpecifications;
  
  /** Текущая тема ('light' или 'dark') */
  theme: 'light' | 'dark';
  
  /** Является ли текущая тема темной */
  isDark: boolean;
  
  /** Функция для переключения темы */
  toggleTheme: () => Promise<void>;
}

/**
 * Hook: useDesignTokens
 * 
 * @returns {DesignTokensHookReturn} Токены, спецификации, информация о теме
 * 
 * @throws {Error} Если используется вне ThemeProvider
 * 
 * @example
 * function MyButton() {
 *   const { tokens, specs } = useDesignTokens();
 *   return (
 *     <Pressable style={{
 *       height: specs.button.primary.height,
 *       backgroundColor: tokens.interactive.accent,
 *       paddingHorizontal: tokens.spacing.lg,
 *     }}>
 *       <Text style={{ color: tokens.text.onAccent }}>Click me</Text>
 *     </Pressable>
 *   );
 * }
 */
export function useDesignTokens(): DesignTokensHookReturn {
  const themeContext = useTheme();

  if (!themeContext) {
    throw new Error(
      'useDesignTokens must be used within ThemeProvider. ' +
      'Make sure your app is wrapped with <ThemeProvider>'
    );
  }

  // Мемоизируем спецификации компонентов, чтобы не пересчитывались каждый раз
  const specs = useMemo(
    () => getComponentSpecs(themeContext.colors as SemanticTokens),
    [themeContext.colors]
  );

  const tokensWithTypography = useMemo(
    () => ({
      ...themeContext.colors,
      typography: themeContext.typography,
    }),
    [themeContext.colors, themeContext.typography]
  );

  return {
    tokens: tokensWithTypography as SemanticTokens & { typography: TypographyStyles },
    specs,
    theme: themeContext.theme,
    isDark: themeContext.isDark,
    toggleTheme: themeContext.toggleTheme,
  };
}

export default useDesignTokens;
