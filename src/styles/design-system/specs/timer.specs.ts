import type { TextStyle } from 'react-native';
import type { VisualFoundation } from '../foundation';
import type { SemanticTokens } from '../theme';

export interface TimerSpecs {
  containerPadding: number;
  padding: number;
  marginVertical: number;
  borderRadius: number;
  backgroundColor: string;
  borderColor: string;
  containerShadow: VisualFoundation['shadows']['standard'];
  
  // Display typography (countdown numbers)
  displayFontSize: number;
  displayFontWeight: TextStyle['fontWeight'];
  displayLineHeight: number;
  displayColor: string;
  
  // Label typography (captions)
  labelFontSize: number;
  labelFontWeight: TextStyle['fontWeight'];
  labelLineHeight: number;
  labelColor: string;
  
  buttonPadding: number;
  buttonBorderRadius: number;
  ringSize: number;
}

export function getTimerSpecs(tokens: SemanticTokens & VisualFoundation): TimerSpecs {
  return {
    containerPadding: tokens.componentSpacing.timer.containerPadding,
    padding: tokens.spacing.standard,
    marginVertical: tokens.spacing.standard,
    borderRadius: tokens.borders.radiusStandard,
    backgroundColor: tokens.surface.surfaceSecondary,
    borderColor: tokens.interactive.border,
    containerShadow: tokens.shadows.standard,
    
    // Display typography — header
    displayFontSize: tokens.header.fontSize,
    displayFontWeight: tokens.header.fontWeight as TextStyle['fontWeight'],
    displayLineHeight: tokens.header.lineHeight,
    displayColor: tokens.text.primary,
    
    // Label typography — text role (compact)
    labelFontSize: Math.round(tokens.text.fontSize * 0.75),
    labelFontWeight: tokens.text.fontWeight as TextStyle['fontWeight'],
    labelLineHeight: Math.round(tokens.text.lineHeight * 0.75),
    labelColor: tokens.text.secondary,
    
    buttonPadding: tokens.componentSpacing.timer.containerPadding,
    buttonBorderRadius: tokens.borders.radiusStandard,
    ringSize: 160,
  };
}
