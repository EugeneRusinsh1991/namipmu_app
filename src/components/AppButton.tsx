import React from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    type GestureResponderEvent,
    type PressableProps,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from 'react-native';
import { useAppButtonStyles } from '../hooks/useAppButtonStyles';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

type AppButtonProps = {
  title: string;
  variant?: AppButtonVariant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  accessibilityLabel?: string;
  onPress?: (event: GestureResponderEvent) => void;
} & Omit<PressableProps, 'style' | 'children' | 'onPress'>;

/**
 * AppButton Component
 * 
 * Кнопка с поддержкой трех вариантов:
 * - primary: основная кнопка с accent цветом
 * - secondary: вторичная кнопка с border
 * - ghost: кнопка без фона
 * 
 * Все размеры, цвета и стили берут из дизайн-системы через useDesignTokens.
 * Это позволяет менять внешний вид кнопок по всему приложению через изменение одного токена.
 */
export default function AppButton({
  title,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  accessibilityLabel,
  onPress,
  ...props
}: AppButtonProps) {
  const flattenedStyle = StyleSheet.flatten(style) as StyleProp<ViewStyle>;
  const flattenedTextStyle = StyleSheet.flatten(textStyle) as StyleProp<TextStyle>;

  const { buttonStyle, labelStyle } = useAppButtonStyles({
    variant,
    disabled,
    style: flattenedStyle,
    textStyle: flattenedTextStyle,
  });

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel ?? (typeof title === 'string' ? title : undefined)}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      {...props}
    >
      <Text style={labelStyle}>{title}</Text>
    </Pressable>
  );
}
