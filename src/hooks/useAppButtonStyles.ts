import { useMemo } from 'react';
import { StyleSheet, type PressableStateCallbackType, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';
import type { ButtonSpecs } from '../styles/design-system';
import { useDesignTokens } from './useDesignTokens';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

export interface UseAppButtonStylesProps {
  variant: AppButtonVariant;
  disabled: boolean;
  shadowless?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export function useAppButtonStyles({ variant, disabled, shadowless, style, textStyle }: UseAppButtonStylesProps) {
  const { tokens, specs } = useDesignTokens();
  const variantSpecs = specs.button[variant];

  const buttonStyle = useMemo< (state: PressableStateCallbackType) => StyleProp<ViewStyle> >(() => {
    const specsAny = variantSpecs as any;
    const isPrimary = variant === 'primary';
    const isSecondary = variant === 'secondary';

    return ({ pressed }: PressableStateCallbackType) => StyleSheet.flatten([
      {
        height: specsAny.height,
        paddingHorizontal: specsAny.paddingHorizontal,
        paddingVertical: specsAny.paddingVertical,
        borderRadius: specsAny.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible', // Предотвращает обрезание теней
      },
      {
        backgroundColor: isPrimary && disabled ? tokens.surface.disabled : specsAny.backgroundColor,
        borderWidth: specsAny.borderWidth,
        borderColor: isSecondary ? (disabled ? tokens.surface.disabled : specsAny.borderColor) : specsAny.borderColor,
        ...(shadowless ? {} : tokens.shadows.standard),
        elevation: shadowless ? 0 : specsAny.shadowElevation || tokens.shadows.standard.elevation,
        zIndex: shadowless ? undefined : 1,
      },
      pressed && !disabled && {
        opacity: 0.85,
      },
      disabled && {
        opacity: specs.button.disabled.opacity,
      },
      style,
    ] as unknown as ViewStyle);
  }, [variant, variantSpecs, tokens, disabled, shadowless, style, specs.button.disabled.opacity]);

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
