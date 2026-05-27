/**
 * Design System - Main Exports
 * 
 * Единая точка входа для всех дизайн-токенов.
 * Экспортирует палитру, семантические токены, спецификации компонентов и типографику.
 */

// ===== PALETTE EXPORTS =====
import { palette } from './palette';
export { palette };

// ===== THEME EXPORTS (Semantic Tokens) =====
    import { darkTheme, getTheme, lightTheme } from './theme';
export type {
    BorderTokens, InteractiveTokens, SemanticTokens, ShadowTokens, SpacingTokens, SurfaceTokens,
    TextTokens, TypographyTokens
} from './theme';
export { darkTheme, getTheme, lightTheme };

// ===== COMPONENT SPECIFICATIONS EXPORTS =====
export { getComponentSpecs } from './components';
export type {
    ButtonSpecs,
    CardSpecs, ChecklistSpecs, ComponentSpecifications, ImageSpecs, InputSpecs,
    QuizSpecs, TimerSpecs
} from './components';

// ===== TYPOGRAPHY EXPORTS =====
export { getTypography, typographyScale } from './typography';
export type { TypographyScale, TypographyStyles } from './typography';

/**
 * Основной интерфейс для полностью разрешенной системы дизайн-токенов
 * Содержит все необходимое для работы UI компонентов
 */
export interface DesignSystem {
  tokens: SemanticTokens;
  specs: ComponentSpecifications;
  typography: TypographyStyles;
}

/**
 * Функция для построения полной системы дизайн-токенов на основе выбранной темы
 */
export function buildDesignSystem(tokens: SemanticTokens, fontScale = 1): DesignSystem {
  const { getTypography } = require('./typography');
  const { getComponentSpecs } = require('./components');
  
  return {
    tokens,
    specs: getComponentSpecs(tokens),
    typography: getTypography(tokens, fontScale),
  };
}

export default {
  buildDesignSystem,
  palette,
  darkTheme,
  lightTheme,
  getTheme,
};
