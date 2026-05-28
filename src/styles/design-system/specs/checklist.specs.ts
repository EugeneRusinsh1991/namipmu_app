import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface ChecklistSpecs {
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  itemPadding: number;
  itemMarginBottom: number;
  itemBorderRadius: number;
  itemBgColor: string;
  itemBorderColor: string;
  checkboxSize: number;
  checkboxBorderRadius: number;
  checkboxBorderWidth: number;
  itemTextColor: string;
  itemCheckedTextColor: string;
}

export function getChecklistSpecs(tokens: SemanticTokens & VisualFoundation): ChecklistSpecs {
  return {
    padding: tokens.spacing.lg,
    marginVertical: tokens.spacing.md,
    borderRadius: tokens.borders.radiusLg,
    backgroundColor: tokens.surface.surfaceSecondary,
    itemPadding: tokens.spacing.md,
    itemMarginBottom: tokens.spacing.md,
    itemBorderRadius: tokens.borders.radiusMd,
    itemBgColor: tokens.surface.surfacePrimary,
    itemBorderColor: tokens.interactive.border,
    checkboxSize: 24,
    checkboxBorderRadius: tokens.borders.radiusSm,
    checkboxBorderWidth: 0,
    itemTextColor: tokens.text.secondary,
    itemCheckedTextColor: tokens.text.tertiary,
  };
}
