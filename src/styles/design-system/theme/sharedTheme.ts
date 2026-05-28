import { palette } from '../palette';

// sharedTheme no longer includes geometric tokens (moved to foundation.ts)
export const sharedTheme = {} as const;

export const sharedPaletteTokens = {
  textOnAccent: palette.white,
  accent: palette.pink600,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
  primary: palette.pink600,
};

export const sharedTextTokens = {
  onAccent: palette.white,
  success: palette.success500,
  warning: palette.warning500,
  danger: palette.danger500,
};

export const sharedInteractiveTokens = {
  accent: palette.pink600,
  secondary: palette.blue500,
};
