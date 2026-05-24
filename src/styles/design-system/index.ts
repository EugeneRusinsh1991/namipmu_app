/**
 * Design System - Main Exports
 */

export { getComponentSpecs } from './components';
export type { ComponentSpecifications } from './components';
export { palette } from './palette';
export { darkTheme, getTheme, lightTheme } from './theme';
export type { SemanticTokens } from './theme';
export { getTypography, typographyScale } from './typography';
export type { TypographyScale, TypographyStyles } from './typography';

// Main interface for fully resolved design tokens
export interface DesignSystem {
  colors: any;
  typography: any;
  components: any;
}

export function buildDesignSystem(colors: any, fontScale = 1): DesignSystem {
  const { getTypography } = require('./typography');
  const { getComponentSpecs } = require('./components');
  
  return {
    colors,
    typography: getTypography(colors, fontScale),
    components: getComponentSpecs(colors),
  };
}

export default { buildDesignSystem };
