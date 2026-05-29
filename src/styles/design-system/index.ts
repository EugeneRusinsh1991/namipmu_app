/**
 * Design System - Main Exports
 * 
 * Единая точка входа для всех дизайн-токенов.
 * Экспортирует палитру, семантические токены, спецификации компонентов и типографику.
 */

// ===== TOKEN MODULES EXPORTS =====
import { palette } from './palette';

export {
    BODY_ROLE,
    HEADING_ROLE,
    SUBHEADING_ROLE
} from './tokens';
export type {
    BorderTokens, ColorTokens, ComponentSpacingTokens, EffectsTokens, GeometryTokens,
    LayoutTokens, SemanticTypographyRole, ShadowGeometry,
    ShadowTokensGeometry, SizingTokens,
    SpacingTokens, TypographyTokens, VisualCardSize,
    VisualTokens
} from './tokens';
export { palette };

// ===== PALETTE EXPORTS =====

// ===== THEME EXPORTS (Semantic Tokens) =====
    import type { SemanticTokens } from './theme';
    import { darkTheme, getTheme, lightTheme } from './theme';
export type { InteractiveTokens, SemanticTokens, SurfaceTokens, TextTokens } from './theme';
export { darkTheme, getTheme, lightTheme };

// Foundation exports (visual geometry)
    import type { VisualFoundation } from './foundation';
    import foundation from './foundation';
export type { VisualFoundation } from './foundation';
export { foundation };

    import type { ComponentSpecifications } from './components';
    import type { TypographyStyles } from './typography';

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
  tokens: SemanticTokens & VisualFoundation;
  specs: ComponentSpecifications;
  typography: TypographyStyles;
}

/**
 * Функция для построения полной системы дизайн-токенов на основе выбранной темы
 */
export function buildDesignSystem(tokens: SemanticTokens, fontScale = 1): DesignSystem {
  const { getTypography } = require('./typography');
  const { getComponentSpecs } = require('./components');
  const foundationModule = require('./foundation');
  const foundation = foundationModule && foundationModule.default ? foundationModule.default : foundationModule;
  const merged = { ...foundation, ...tokens } as SemanticTokens & VisualFoundation;
  
  return {
    tokens: merged,
    specs: getComponentSpecs(merged),
    typography: getTypography(tokens, fontScale, foundation),
  };
}

export default {
  buildDesignSystem,
  palette,
  darkTheme,
  lightTheme,
  getTheme,
};
