import tokens from './tokens';
import { lightColors } from './tokens/colors';

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or `src/styles/design-system/theme.ts` instead.
 * This is a legacy export for backwards compatibility only.
 */
// Backwards-compatible exports for existing code (light defaults)
export const colors = lightColors || tokens.colors;

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or import spacing directly from design-system instead.
 * This is a legacy export with arbitrary key mappings. Use design-system tokens for consistency.
 */
// Backwards-compatible spacing map (common keys used across the codebase)
export const spacing = {
  ...tokens.spacing,
  sm: tokens.spacing.s,
  md: tokens.spacing.m,
  lg: tokens.spacing.l,
};

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or `src/styles/design-system/theme.ts` instead.
 * This is a legacy export for backwards compatibility only.
 */
export const radius = tokens.borderRadius;

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or `src/styles/design-system/theme.ts` instead.
 * This is a legacy export for backwards compatibility only.
 */
export const layout = {
  containerPadding: tokens.spacing.containerPadding,
  maxWidth: tokens.spacing.maxWidth,
  maxContentWidth: tokens.spacing.maxContentWidth,
};

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or `src/styles/design-system/typography.ts` instead.
 * This is a legacy export with simplified typography tokens. Use design-system for full typography system.
 */
export const typography = {
  fontSizeSm: tokens.typography.sizes.body - 2,
  fontSizeMd: tokens.typography.sizes.body,
  fontSizeLg: tokens.typography.sizes.h3,
  fontSizeXl: tokens.typography.sizes.h1,
  fontWeight600: tokens.typography.weights.semibold,
};

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or `src/styles/design-system/theme.ts` instead.
 * This is a legacy export for backwards compatibility only.
 */
export const fonts = {
  main: tokens.typography.families.main,
  accent: tokens.typography.families.heading,
};

export function getTheme(mode = 'light') {
  const isDark = mode === 'dark';
  const colorsObj = isDark ? require('./tokens/colors').darkColors : require('./tokens/colors').lightColors;
  return {
    colors: colorsObj,
    spacing: { ...spacing },
    radius: tokens.borderRadius,
    layout,
    typography,
    fonts,
  };
}

/**
 * @deprecated Use tokens from `useDesignTokens()` hook or `src/styles/design-system/theme.ts` instead.
 * This is a legacy default export for backwards compatibility only. All named exports here are deprecated.
 */
export default { colors, spacing, radius, layout, typography, fonts };
