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
  const buttonStyle = ({ pressed }: { pressed: boolean }) =>
    StyleSheet.flatten([
      styles.button,
      variant === 'primary' && styles.primary,
      variant === 'secondary' && styles.secondary,
      variant === 'ghost' && styles.ghost,
      pressed && !disabled && styles.pressed,
      disabled && styles.disabled,
      style,
    ]);

  const labelStyle = StyleSheet.flatten([
    styles.label,
    variant === 'primary' && styles.labelPrimary,
    variant === 'secondary' && styles.labelSecondary,
    variant === 'ghost' && styles.labelGhost,
    disabled && styles.labelDisabled,
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
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 3,
  },
  primary: {
    backgroundColor: '#8f735f',
  },
  secondary: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#d8b69b',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.995 }],
  },
  disabled: {
    opacity: 0.55,
  },
  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '700',
  },
  labelPrimary: {
    color: '#fff',
  },
  labelSecondary: {
    color: '#2b1d14',
  },
  labelGhost: {
    color: '#2b1d14',
  },
  labelDisabled: {
    color: '#7f6a5a',
  },
});
