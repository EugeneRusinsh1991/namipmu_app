import { useMemo } from 'react';
import { StyleSheet, type PressableStateCallbackType, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import type { ButtonSpecs } from '../styles/design-system';
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

  const buttonStyle = useMemo< (state: PressableStateCallbackType) => StyleProp<ViewStyle> >(() => {
    if (variant === 'primary') {
      const primarySpecs = variantSpecs as ButtonSpecs['primary'];
      return ({ pressed }: PressableStateCallbackType) => StyleSheet.flatten([
        {
          height: primarySpecs.height,
          paddingHorizontal: primarySpecs.paddingHorizontal,
          paddingVertical: primarySpecs.paddingVertical,
          borderRadius: primarySpecs.borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          backgroundColor: disabled ? tokens.surface.disabled : primarySpecs.backgroundColor,
          shadowColor: tokens.text.primary,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 14,
          elevation: primarySpecs.shadowElevation || 4,
        },
        pressed && !disabled && {
          opacity: 0.85,
        },
        disabled && {
          opacity: specs.button.disabled.opacity,
        },
        style,
      ] as unknown as ViewStyle);
    }

    if (variant === 'secondary') {
      const secondarySpecs = variantSpecs as ButtonSpecs['secondary'];
      return ({ pressed }: PressableStateCallbackType) => StyleSheet.flatten([
        {
          height: secondarySpecs.height,
          paddingHorizontal: secondarySpecs.paddingHorizontal,
          paddingVertical: secondarySpecs.paddingVertical,
          borderRadius: secondarySpecs.borderRadius,
          alignItems: 'center',
          justifyContent: 'center',
        },
        {
          backgroundColor: secondarySpecs.backgroundColor,
          borderWidth: secondarySpecs.borderWidth,
          borderColor: disabled ? tokens.surface.disabled : secondarySpecs.borderColor,
        },
        pressed && !disabled && {
          opacity: 0.85,
        },
        disabled && {
          opacity: specs.button.disabled.opacity,
        },
        style,
      ] as unknown as ViewStyle);
    }

    return ({ pressed }: PressableStateCallbackType) => StyleSheet.flatten([
      {
        height: variantSpecs.height,
        paddingHorizontal: variantSpecs.paddingHorizontal,
        paddingVertical: variantSpecs.paddingVertical,
        borderRadius: variantSpecs.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
      },
      {
        backgroundColor: variantSpecs.backgroundColor,
      },
      pressed && !disabled && {
        opacity: 0.85,
      },
      disabled && {
        opacity: specs.button.disabled.opacity,
      },
      style,
    ] as unknown as ViewStyle);
  }, [variant, variantSpecs, tokens, disabled, style, specs.button.disabled.opacity]);

  const labelStyle = useMemo(() => {
    const labelSpecs = variantSpecs as ButtonSpecs['primary'] | ButtonSpecs['secondary'] | ButtonSpecs['ghost'];
    return StyleSheet.flatten([
      {
        fontSize: labelSpecs.fontSize,
        fontWeight: labelSpecs.fontWeight,
        lineHeight: labelSpecs.lineHeight,
        color: disabled ? tokens.text.disabled : labelSpecs.textColor,
      },
      textStyle,
    ]) as TextStyle;
  }, [variantSpecs, tokens.text.disabled, disabled, textStyle]);

  return {
    buttonStyle,
    labelStyle,
  };
}
