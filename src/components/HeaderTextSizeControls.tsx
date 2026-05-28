import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTextSize } from '../context/TextSizeContext';
import { useDesignTokens } from '../hooks/useDesignTokens';

type HeaderTextSizeControlsProps = {};

export default function HeaderTextSizeControls({}: HeaderTextSizeControlsProps) {
  const { fontScale, decreaseFontSize, increaseFontSize } = useTextSize();
  const { tokens, specs } = useDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: tokens.surface.surfaceSecondary,
          borderRadius: tokens.borders.radiusMd,
          padding: tokens.spacing.xs,
        },
        button: {
          minWidth: 44,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: specs.button.secondary.borderRadius,
          backgroundColor: specs.button.secondary.backgroundColor,
          borderWidth: specs.button.secondary.borderWidth,
          borderColor: specs.button.secondary.borderColor,
          paddingHorizontal: specs.button.secondary.paddingHorizontal,
          paddingVertical: specs.button.secondary.paddingVertical,
        },
        buttonPressed: {
          opacity: 0.75,
        },
        buttonText: {
          color: tokens.interactive.accent,
          fontWeight: tokens.typography.fontWeightBold,
          fontSize: specs.button.secondary.fontSize,
        },
        labelContainer: {
          marginHorizontal: tokens.spacing.sm,
          minWidth: 64,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.xs,
          borderRadius: tokens.borders.radiusMd,
          backgroundColor: tokens.surface.surfacePrimary,
          borderWidth: specs.button.secondary.borderWidth,
          borderColor: specs.button.secondary.borderColor,
        },
        label: {
          color: tokens.text.primary,
          fontWeight: tokens.typography.fontWeightSemibold,
          fontSize: tokens.typography.fontSizeSm,
        },
      }),
    [tokens, specs]
  );

  return (
    <View style={styles.container}>
      <Pressable
        onPress={decreaseFontSize}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityLabel="Уменьшить шрифт"
      >
        <Text style={styles.buttonText}>A-</Text>
      </Pressable>

      <View style={styles.labelContainer}>
        <Text style={styles.label}>{Math.round(fontScale * 100)}%</Text>
      </View>

      <Pressable
        onPress={increaseFontSize}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        accessibilityLabel="Увеличить шрифт"
      >
        <Text style={styles.buttonText}>A+</Text>
      </Pressable>
    </View>
  );
}
