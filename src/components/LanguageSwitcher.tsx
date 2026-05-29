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
          padding: tokens.spacing.standard,
          alignSelf: 'center',
          borderWidth: tokens.borders.widthStandard,
          borderColor: tokens.interactive.border,
          backgroundColor: 'transparent',
          ...(tokens.shadows?.standard ?? {}),
          marginVertical: tokens.spacing.standard,
        },
        option: {
          flex: 1,
          minWidth: 44,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: tokens.borders.radiusStandard,
          backgroundColor: tokens.surface.surfaceSecondary,
          borderWidth: tokens.borders.widthStandard,
          borderColor: tokens.interactive.border,
          paddingVertical: tokens.spacing.standard,
          paddingHorizontal: tokens.spacing.standard,
          ...tokens.shadows.standard,
        },
        optionSpacing: {
          marginRight: tokens.spacing.standard,
        },
        optionActive: {
          backgroundColor: tokens.interactive.accent,
          borderWidth: tokens.borders.widthStandard,
          borderColor: tokens.interactive.accent,
        },
        optionPressed: {
          opacity: 0.78,
          transform: [{ scale: 0.995 }],
        },
        optionLabel: {
          ...tokens.typography.text,
          fontWeight: '600',
          fontFamily: 'sans-serif',
          color: tokens.text.primary,
        },
        optionLabelActive: {
          ...tokens.typography.text,
          fontWeight: '600',
          fontFamily: 'sans-serif',
          color: tokens.interactive.accent,
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
