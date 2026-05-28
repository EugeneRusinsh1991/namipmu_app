import { useMemo } from 'react';
import { StyleSheet, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import { useDesignTokens } from './useDesignTokens';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface UseAppButtonStylesProps {
  variant: AppButtonVariant;
  disabled: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function useAppButtonStyles({ variant, disabled, style, textStyle }: UseAppButtonStylesProps) {
  const { tokens, specs } = useDesignTokens();
  const variantSpecs = specs.button[variant];

  const buttonStyle = useMemo(() => ({ pressed }: { pressed: boolean }) =>
    StyleSheet.flatten([
      {
        height: variantSpecs.height,
        paddingHorizontal: variantSpecs.paddingHorizontal,
        paddingVertical: variantSpecs.paddingVertical,
        borderRadius: variantSpecs.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
      },
      variant === 'primary' && {
        backgroundColor: disabled ? tokens.surface.disabled : variantSpecs.backgroundColor,
        shadowColor: tokens.text.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: variantSpecs.shadowElevation || 4,
      },
      variant === 'secondary' && {
        backgroundColor: variantSpecs.backgroundColor,
        borderWidth: variantSpecs.borderWidth,
        borderColor: disabled ? tokens.surface.disabled : variantSpecs.borderColor,
      },
      variant === 'ghost' && {
        backgroundColor: variantSpecs.backgroundColor,
      },
      pressed && !disabled && {
        opacity: 0.85,
      },
      disabled && {
        opacity: specs.button.disabled.opacity,
      },
      style,
    ]),
  [variant, variantSpecs, tokens, disabled, style, specs.button.disabled.opacity]);

  const labelStyle = useMemo(() => StyleSheet.flatten([
    {
      fontSize: variantSpecs.fontSize,
      fontWeight: variantSpecs.fontWeight,
      lineHeight: variantSpecs.lineHeight,
      color: disabled ? tokens.text.disabled : variantSpecs.textColor,
    },
    textStyle,
  ]), [variantSpecs, tokens.text.disabled, disabled, textStyle]);

  return {
    buttonStyle,
    labelStyle,
  };
}
