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
          backgroundColor: 'transparent',
          borderRadius: tokens.borders.radiusStandard,
          padding: tokens.spacing.standard,
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
          ...tokens.shadows.standard,
        },
        buttonPressed: {
          opacity: 0.75,
        },
        buttonText: {
          ...tokens.typography?.text,
          fontSize: Math.round((tokens.typography?.text?.fontSize ?? 16) * 0.9),
          fontWeight: '600',
          fontFamily: 'sans-serif',
          color: tokens.interactive?.accent,
        },
        labelContainer: {
          marginHorizontal: tokens.spacing.standard,
          minWidth: 64,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: tokens.spacing.standard,
          paddingVertical: tokens.spacing.standard,
          borderRadius: specs.button.secondary.borderRadius,
          backgroundColor: specs.button.secondary.backgroundColor,
          borderWidth: specs.button.secondary.borderWidth,
          borderColor: specs.button.secondary.borderColor,
          ...tokens.shadows.standard,
        },
        label: {
          ...tokens.typography?.text,
          fontSize: Math.round((tokens.typography?.text?.fontSize ?? 16) * 0.9),
          fontWeight: '600',
          fontFamily: 'sans-serif',
          color: tokens.interactive?.accent,
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
