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
import { useTheme } from '../context/ThemeContext';
import { radius } from '../styles/theme';

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
  const { colors } = useTheme();

  const buttonStyle = ({ pressed }: { pressed: boolean }) =>
    StyleSheet.flatten([
      styles.button,
      variant === 'primary' && styles.primary,
      variant === 'secondary' && styles.secondary,
      variant === 'ghost' && styles.ghost,
      pressed && !disabled && styles.pressed,
      disabled && styles.disabled,
      // dynamic color overrides
      variant === 'primary' && { backgroundColor: colors.accent },
      variant === 'secondary' && { borderColor: colors.border },
      pressed && !disabled && { opacity: 0.85 },
      { shadowColor: colors.textPrimary },
      style,
    ]);

  const labelStyle = StyleSheet.flatten([
    styles.label,
    variant === 'primary' && styles.labelPrimary,
    variant === 'secondary' && styles.labelSecondary,
    variant === 'ghost' && styles.labelGhost,
    disabled && styles.labelDisabled,
    // dynamic label colors
    variant === 'primary' && { color: colors.white },
    variant !== 'primary' && { color: colors.textPrimary },
    disabled && { color: colors.secondaryText },
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

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 24,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },
  primary: {},
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  labelPrimary: {},
  labelSecondary: {},
  labelGhost: {},
  labelDisabled: {},
});
