/**
 * Design System - Theme
 *
 * Основная точка входа для семантических тем.
 * Этот файл минимален: он экспортирует типы, темы и функцию выбора темы.
 */

export type {
  BorderTokens,
  InteractiveTokens,
  SemanticTokens,
  ShadowTokens,
  SpacingTokens,
  SurfaceTokens,
  TextTokens,
  TypographyTokens
} from './theme/types';

import { darkTheme } from './theme/darkTheme';
import { lightTheme } from './theme/lightTheme';
import type { SemanticTokens } from './theme/types';

export type ThemeName = 'light' | 'dark';

const themes = {
  light: lightTheme,
  dark: darkTheme,
} as const;

export function getTheme(mode: boolean | ThemeName = 'light'): SemanticTokens {
  if (typeof mode === 'boolean') {
    return mode ? darkTheme : lightTheme;
  }

  return themes[mode] ?? lightTheme;
}

export { darkTheme, lightTheme, themes };

export default { lightTheme, darkTheme, getTheme, themes };
