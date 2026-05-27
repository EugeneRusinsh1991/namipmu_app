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
import { useDesignTokens } from '../hooks/useDesignTokens';

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
  const { tokens, specs } = useDesignTokens();
  
  // Получаем спецификацию для текущего варианта кнопки
  const variantSpecs = specs.button[variant];
  
  // Динамические стили для кнопки (зависят от состояния и варианта)
  const buttonStyle = ({ pressed }: { pressed: boolean }) =>
    StyleSheet.flatten([
      // Базовые размеры из спецификации
      {
        height: variantSpecs.height,
        paddingHorizontal: variantSpecs.paddingHorizontal,
        paddingVertical: variantSpecs.paddingVertical,
        borderRadius: variantSpecs.borderRadius,
        alignItems: 'center',
        justifyContent: 'center',
      },
      
      // Специфичные для primary варианта
      variant === 'primary' && {
        backgroundColor: disabled ? tokens.surface.disabled : variantSpecs.backgroundColor,
        shadowColor: tokens.text.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 14,
        elevation: variantSpecs.shadowElevation || 4,
      },
      
      // Специфичные для secondary варианта
      variant === 'secondary' && {
        backgroundColor: variantSpecs.backgroundColor,
        borderWidth: variantSpecs.borderWidth,
        borderColor: disabled ? tokens.surface.disabled : variantSpecs.borderColor,
      },
      
      // Специфичные для ghost варианта
      variant === 'ghost' && {
        backgroundColor: variantSpecs.backgroundColor,
      },
      
      // Pressed состояние
      pressed && !disabled && {
        opacity: 0.85,
      },
      
      // Disabled состояние
      disabled && {
        opacity: specs.button.disabled.opacity,
      },
      
      // Пользовательский стиль (может переопределить любой из выше)
      style,
    ]);

  // Динамические стили для текста
  const labelStyle = StyleSheet.flatten([
    {
      fontSize: variantSpecs.fontSize,
      fontWeight: variantSpecs.fontWeight,
      lineHeight: variantSpecs.lineHeight,
    },
    
    // Цвет текста в зависимости от варианта
    variant === 'primary' && {
      color: disabled ? tokens.text.disabled : variantSpecs.textColor,
    },
    variant !== 'primary' && {
      color: disabled ? tokens.text.disabled : variantSpecs.textColor,
    },
    
    // Пользовательский текстовый стиль
    textStyle,
  ]);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={buttonStyle}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel ?? title}
      android_ripple={{ color: 'rgba(0,0,0,0.08)' }}
      {...props}
    >
      <Text style={labelStyle}>{title}</Text>
    </Pressable>
  );
}
