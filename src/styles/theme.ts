import tokens from './tokens';
import { lightColors } from './tokens/colors';

// Backwards-compatible exports for existing code (light defaults)
export const colors = lightColors || tokens.colors;
// Backwards-compatible spacing map (common keys used across the codebase)
export const spacing = {
  xs: tokens.spacing.xs ?? tokens.spacing.s ?? 4,
  sm: tokens.spacing.s ?? tokens.spacing.xs ?? 8,
  md: tokens.spacing.m ?? tokens.spacing.sm ?? 16,
  lg: tokens.spacing.l ?? tokens.spacing.m ?? 24,
  xl: tokens.spacing.xl ?? tokens.spacing.l ?? 32,
  xxl: tokens.spacing.xxl ?? 64,
  // keep original raw values for layouts
  ...tokens.spacing,
};
export const radius = tokens.borderRadius;
export const layout = {
  containerPadding: tokens.spacing.containerPadding,
  maxWidth: tokens.spacing.maxWidth,
  maxContentWidth: tokens.spacing.maxContentWidth,
};

export const typography = {
  fontSizeSm: tokens.typography.sizes.body - 2,
  fontSizeMd: tokens.typography.sizes.body,
  fontSizeLg: tokens.typography.sizes.h3,
  fontSizeXl: tokens.typography.sizes.h1,
  fontWeight600: tokens.typography.weights.semibold,
};

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

export default { colors, spacing, radius, layout, typography, fonts };
