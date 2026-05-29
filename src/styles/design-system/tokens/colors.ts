/**
 * Color Tokens Module
 * 
 * Семантические цветовые роли и палитра.
 * Управление цветами для светлой и темной тем.
 */

/**
 * Color semantic roles interface
 * Defines functional color assignments for the design system
 */
export interface ColorTokens {
  // Text colors
  textPrimary?: string;
  textSecondary?: string;
  textInverse?: string;
  textLink?: string;
  bodyText?: string;

  // Background colors
  backgroundPrimary?: string;
  backgroundSecondary?: string;
  backgroundSurface?: string;
  backgroundTertiary?: string;

  // Interactive colors
  interactive?: {
    accent?: string;
    disabled?: string;
    active?: string;
  };

  // Border colors
  borderSubtle?: string;
  borderStrong?: string;

  // Status colors
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
}

/**
 * Empty color tokens object for foundation.
 * Color assignments are provided by theme context (theme.ts).
 */
export const createColorTokens = (): ColorTokens => ({
  // Colors are theme-dependent, populated by theme context
});

export default {
  createColorTokens,
};
