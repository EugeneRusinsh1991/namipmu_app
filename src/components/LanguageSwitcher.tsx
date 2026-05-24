import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { radius, spacing } from '../styles/theme';

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
  const { colors } = useTheme();
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
                { backgroundColor: isActive ? colors.cardBackground : colors.white, borderColor: colors.border },
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
                { color: isActive ? colors.textPrimary : colors.secondaryText },
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

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    borderRadius: radius.round,
    padding: spacing.xs / 2,
    alignSelf: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
    marginVertical: 18,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSpacing: {
    marginRight: 10,
  },
  optionActive: {
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  optionPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.995 }],
  },
  optionLabel: {
    //fontSize: typography.fontSizeSm,
    lineHeight: 20,
    fontWeight: '600',
  },
  optionLabelActive: {
    fontWeight: '600',
  },
});
