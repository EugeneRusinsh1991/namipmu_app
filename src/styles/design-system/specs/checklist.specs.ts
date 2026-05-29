import type { TextStyle } from 'react-native';
import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface ChecklistSpecs {
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  containerShadow: VisualFoundation['shadows']['standard'];
  
  // Item typography
  itemFontSize: number;
  itemFontWeight: TextStyle['fontWeight'];
  itemLineHeight: number;
  itemPadding: number;
  itemMarginBottom: number;
  itemBorderRadius: number;
  itemBgColor: string;
  itemBorderColor: string;
  itemTextColor: string;
  itemCheckedTextColor: string;
  
  // Checkbox
  checkboxSize: number;
  checkboxBorderRadius: number;
  checkboxBorderWidth: number;
}

export function getChecklistSpecs(tokens: SemanticTokens & VisualFoundation): ChecklistSpecs {
  return {
    padding: tokens.spacing.standard,
    marginVertical: tokens.spacing.standard,
    borderRadius: tokens.borders.radiusStandard,
    backgroundColor: tokens.surface.surfaceSecondary,
    containerShadow: tokens.shadows.standard,
    
    // Item typography — text role
    itemFontSize: tokens.text.fontSize,
    itemFontWeight: tokens.text.fontWeight as TextStyle['fontWeight'],
    itemLineHeight: tokens.text.lineHeight,
    itemPadding: tokens.componentSpacing.checklist.itemPadding,
    itemMarginBottom: tokens.componentSpacing.checklist.itemMarginBottom,
    itemBorderRadius: tokens.borders.radiusStandard,
    itemBgColor: tokens.surface.surfacePrimary,
    itemBorderColor: tokens.interactive.border,
    itemTextColor: tokens.text.secondary,
    itemCheckedTextColor: tokens.text.tertiary,
    
    // Checkbox
    checkboxSize: tokens.sizing.checkboxSize,
    checkboxBorderRadius: tokens.borders.radiusStandard,
    checkboxBorderWidth: 0,
  };
}
