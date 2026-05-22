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
];

export default function LanguageSwitcher({
  value,
  onChange,
  options = defaultOptions,
  style,
  optionTextStyle,
}: LanguageSwitcherProps) {
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

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    backgroundColor: '#fff3eb',
    borderRadius: 999,
    padding: 4,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#f2dbca',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2,
    marginVertical: 18,
  },
  option: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(216,182,155,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSpacing: {
    marginRight: 10,
  },
  optionActive: {
    backgroundColor: '#d8b69b',
    borderColor: '#d8b69b',
    shadowColor: '#8f735f',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 3,
  },
  optionPressed: {
    opacity: 0.78,
    transform: [{ scale: 0.995 }],
  },
  optionLabel: {
    fontSize: 14,
    lineHeight: 20,
    color: '#6d5a4b',
    fontWeight: '600',
  },
  optionLabelActive: {
    color: '#2b1d14',
    fontWeight: '700',
  },
});
