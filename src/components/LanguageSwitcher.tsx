import React, { useMemo } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    View,
    type StyleProp,
    type TextStyle,
    type ViewStyle,
} from 'react-native';
import { useDesignTokens } from '../hooks/useDesignTokens';

type LanguageOption = {
  value: string;
  label: string;
};

type LanguageSwitcherProps = {
  value: string;
  onChange: (value: string) => void;
  options?: LanguageOption[];
  style?: StyleProp<ViewStyle>;
  optionTextStyle?: StyleProp<TextStyle>;
};

const defaultOptions: LanguageOption[] = [
  { value: 'ua', label: 'Українська' },
  { value: 'ru', label: 'Русский' },
  { value: 'eng', label: 'English' },
  { value: 'ger', label: 'Deutsch' },
];

export default function LanguageSwitcher({
  value,
  onChange,
  options = defaultOptions,
  style,
  optionTextStyle,
}: LanguageSwitcherProps) {
  const { tokens } = useDesignTokens();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        root: {
          flexDirection: 'row',
          borderRadius: tokens.borders.radiusFull,
          padding: tokens.spacing.xs,
          alignSelf: 'center',
          borderWidth: tokens.borders.widthBase,
          borderColor: tokens.interactive.border,
          backgroundColor: tokens.surface.surfacePrimary,
          ...tokens.shadows.sm,
          marginVertical: tokens.spacing.md,
        },
        option: {
          flex: 1,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.borders.radiusFull,
          borderWidth: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: tokens.surface.surfaceSecondary,
        },
        optionSpacing: {
          marginRight: tokens.spacing.sm,
        },
        optionActive: {
          backgroundColor: tokens.interactive.accent,
          borderWidth: tokens.borders.widthThin,
          borderColor: tokens.interactive.accent,
          ...tokens.shadows.sm,
        },
        optionPressed: {
          opacity: 0.78,
          transform: [{ scale: 0.995 }],
        },
        optionLabel: {
          lineHeight: 20,
          fontSize: tokens.typography.fontSizeSm,
          color: tokens.text.tertiary,
        },
        optionLabelActive: {
          color: tokens.text.primary,
          fontWeight: tokens.typography.fontWeightSemibold,
        },
      }),
    [tokens]
  );

  const containerStyle = StyleSheet.flatten([styles.root, style]);

  return (
    <View style={containerStyle}>
      {options.map((option, index) => {
        const isActive = option.value === value;
        const isLast = index === options.length - 1;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) =>
              StyleSheet.flatten([
                styles.option,
                !isLast && styles.optionSpacing,
                isActive && styles.optionActive,
                pressed && styles.optionPressed,
              ])
            }
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Выбрать язык ${option.label}`}
          >
            <Text
              style={StyleSheet.flatten([
                styles.optionLabel,
                isActive && styles.optionLabelActive,
                optionTextStyle,
              ])}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
