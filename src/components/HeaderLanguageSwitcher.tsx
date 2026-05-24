import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { colors, radius } from '../styles/theme';

type LanguageOption = {
  value: string;
  label: string;
  abbr: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { value: 'ua', label: 'Українська', abbr: 'UA' },
  { value: 'ru', label: 'Русский', abbr: 'RU' },
  { value: 'eng', label: 'English', abbr: 'EN' },
  { value: 'ger', label: 'Deutsch', abbr: 'DE' },
];

export default function PageLanguageButton() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme, colors: themeColors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGE_OPTIONS.find((opt) => opt.value === lang);
  const currentAbbr = currentLanguage?.abbr || 'UA';

  // dynamic styles derived from theme colors
  const dynamicButtonStyle = {
    backgroundColor: themeColors?.white || colors.white,
    borderColor: themeColors?.border || colors.border,
  };

  const dynamicDropdownStyle = {
    backgroundColor: themeColors?.white || colors.white,
    borderColor: themeColors?.border || colors.border,
  };

  const dynamicTextColor = { color: themeColors?.textPrimary || colors.textPrimary };

  const handleSelectLanguage = (value: string) => {
    setLang(value);
    setIsOpen(false);
  };

  return (
    <>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Pressable
          style={({ pressed }) => [styles.button, dynamicButtonStyle, pressed && styles.buttonPressed]}
          onPress={() => setIsOpen(!isOpen)}
          accessibilityRole="button"
          accessibilityLabel={`Язык: ${currentLanguage?.label}`}
        >
          <Text style={[styles.buttonText, dynamicTextColor]}>{currentAbbr}</Text>
          <Text style={[styles.arrow, dynamicTextColor]}>▼</Text>
        </Pressable>

        <Pressable
          onPress={() => toggleTheme()}
          accessibilityRole="button"
          accessibilityLabel={`Переключить тему`}
          style={({ pressed }) => [styles.iconButton, { backgroundColor: themeColors?.white || colors.white }, pressed && { opacity: 0.7 }]}
        >
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={18}
            color={themeColors?.accent || colors.accent}
          />
        </Pressable>
      </View>

      {/* Dropdown menu */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setIsOpen(false)}
        >
          <View style={[styles.dropdownContainer, dynamicDropdownStyle]}>
            {LANGUAGE_OPTIONS.map((option) => {
              const isActive = option.value === lang;
              return (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.option,
                    isActive && { backgroundColor: themeColors?.cardBackground || colors.cardBackground },
                    pressed && styles.optionPressed,
                  ]}
                  onPress={() => handleSelectLanguage(option.value)}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: isActive }}
                >
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionCode, { color: themeColors?.textPrimary || colors.textPrimary }]}>{option.abbr}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        { color: themeColors?.textPrimary || colors.textPrimary },
                        isActive && { color: themeColors?.primary || colors.primary },
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
  },
  arrow: {
    fontSize: 10,
    marginLeft: 2,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 80,
    paddingRight: 16,
  },
  dropdownContainer: {
    backgroundColor: colors.white,
    borderRadius: radius.md,
    overflow: 'hidden',
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  optionActive: {
    backgroundColor: colors.cardBackground,
  },
  optionPressed: {
    backgroundColor: colors.cardBackground,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionCode: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textPrimary,
    minWidth: 30,
  },
  optionText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '600',
  },
  iconButton: {
    padding: 6,
    borderRadius: radius.round,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
