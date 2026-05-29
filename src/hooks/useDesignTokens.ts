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
 *   borderRadius: tokens.borders.radiusStandard,
 * }} />
 */

import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import {
  getComponentSpecs,
  type ComponentSpecifications,
  type SemanticTokens,
} from '../styles/design-system';
import foundation, { type ShadowTokensGeometry, type VisualFoundation } from '../styles/design-system/foundation';
import type { TypographyStyles } from '../styles/design-system/typography';

/**
 * Полный набор дизайн-токенов и спецификаций
 */
export interface DesignTokensHookReturn {
  /** Семантические токены (цвета, типография, отступы, размеры) */
  tokens: SemanticTokens & VisualFoundation & { typography: TypographyStyles };
  
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
 *       paddingHorizontal: tokens.spacing.standard,
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
    () => {
      const merged = ({ ...foundation, ...(themeContext.colors as SemanticTokens) } as SemanticTokens & VisualFoundation);
      // keep a consistent shadows.standard structure even if theme colors include shadows or omit them
      merged.shadows = {
        standard: {
          ...foundation.shadows.standard,
          ...((merged.shadows as any)?.standard || {}),
        },
      } as ShadowTokensGeometry;
      // inject shadowColor from theme into geometry shadows
      const shadowColor = (themeContext.colors as any).shadowColor as string | undefined || 'rgba(0,0,0,0.3)'; // Более насыщенный цвет
      // ensure borders.colorDefault is populated from theme borderDefault or interactive.border
      const borderDefault = (themeContext.colors as any).borderDefault as string | undefined;
      const interactiveBorder = (themeContext.colors as any).interactive?.border as string | undefined;
      if (merged.borders) {
        (merged.borders as any).colorDefault = borderDefault ?? interactiveBorder ?? (merged.borders as any).colorDefault;
      }
      if (merged.shadows) {
        // assign shadowColor for each shadow level
        (Object.keys(merged.shadows) as Array<keyof typeof merged.shadows>).forEach((k) => {
          (merged.shadows as any)[k] = {
            ...((merged.shadows as any)[k] || {}),
            shadowColor,
          };
        });
      }
      return getComponentSpecs(merged as any);
    },
    [themeContext.colors]
  );

  const tokensWithTypography = useMemo(() => {
    const merged = ({ ...foundation, ...(themeContext.colors as SemanticTokens) } as SemanticTokens & VisualFoundation);
    merged.shadows = {
      standard: {
        ...foundation.shadows.standard,
        ...((merged.shadows as any)?.standard || {}),
      },
    } as ShadowTokensGeometry;
    const shadowColor = (themeContext.colors as any).shadowColor as string | undefined || 'rgba(0,0,0,0.3)';
    if (merged.shadows) {
      (Object.keys(merged.shadows) as Array<keyof typeof merged.shadows>).forEach((k) => {
        (merged.shadows as any)[k] = {
          ...((merged.shadows as any)[k] || {}),
          shadowColor: shadowColor,
        };
      });
    }
    return {
      ...merged,
      typography: themeContext.typography,
    };
  }, [themeContext.colors, themeContext.typography]);

  return {
    tokens: tokensWithTypography as SemanticTokens & VisualFoundation & { typography: TypographyStyles },
    specs,
    theme: themeContext.theme,
    isDark: themeContext.isDark,
    toggleTheme: themeContext.toggleTheme,
  };
}

export default useDesignTokens;
