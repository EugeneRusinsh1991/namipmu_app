import { Ionicons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useDesignTokens } from '../hooks/useDesignTokens';

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
  const { tokens, specs } = useDesignTokens();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGE_OPTIONS.find((opt) => opt.value === lang);
  const currentAbbr = currentLanguage?.abbr || 'UA';

  const dynamicTextColor = { color: tokens.text.primary };

  const handleSelectLanguage = (value: string) => {
    setLang(value);
    setIsOpen(false);
  };

  // Memoized styles using design tokens
  const styles = useMemo(() => StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      minWidth: 44,
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
      ...tokens.typography.text,
      fontSize: Math.round(tokens.typography.text.fontSize * 0.9),
      fontWeight: '600',
      fontFamily: 'sans-serif',
      color: tokens.interactive.accent,
    },
    arrow: {
      ...tokens.typography.text,
      fontSize: Math.round(tokens.typography.text.fontSize * 0.8),
      fontWeight: '600',
      fontFamily: 'sans-serif',
      marginLeft: 2,
      color: tokens.interactive.accent,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 80,
      paddingRight: tokens.spacing.standard,
    },
    dropdownContainer: {
      backgroundColor: tokens.white,
      borderRadius: tokens.borders.radiusStandard,
      overflow: 'hidden',
      minWidth: 180,
      ...(tokens.shadows?.standard ?? {}),
      borderWidth: tokens.borders.widthStandard,
      borderColor: tokens.interactive.border,
    },
    option: {
      paddingVertical: tokens.spacing.standard,
      paddingHorizontal: tokens.spacing.standard,
      borderBottomWidth: tokens.borders.widthStandard,
      borderBottomColor: tokens.interactive.border,
    },
    optionActive: {
      backgroundColor: tokens.surface.surfaceSecondary,
    },
    optionPressed: {
      backgroundColor: tokens.surface.surfaceSecondary,
    },
    optionContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: tokens.spacing.standard,
    },
    optionCode: {
      ...tokens.typography.text,
      fontSize: Math.round(tokens.typography.text.fontSize * 0.8),
      fontWeight: '600',
      fontFamily: 'sans-serif',
      minWidth: 30,
    },
    optionText: {
      ...tokens.typography.text,
      fontWeight: '600',
      fontFamily: 'sans-serif',
    },
    optionTextActive: {
      color: tokens.interactive.accent,
    },
    iconButton: {
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
  }), [tokens, specs]);

  return (
    <>
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={() => setIsOpen(!isOpen)}
          accessibilityRole="button"
          accessibilityLabel={`Язык: ${currentLanguage?.label}`}
        >
          <Text style={styles.buttonText}>{currentAbbr}</Text>
          <Text style={styles.arrow}>▼</Text>
        </Pressable>

        <Pressable
          onPress={() => toggleTheme()}
          accessibilityRole="button"
          accessibilityLabel={`Переключить тему`}
          style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}
        >
          <Ionicons
            name={theme === 'dark' ? 'sunny' : 'moon'}
            size={18}
            color={themeColors?.accent || tokens.interactive.accent}
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
          <View style={styles.dropdownContainer}>
            {LANGUAGE_OPTIONS.map((option) => {
              const isActive = option.value === lang;
              return (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.option,
                    pressed && styles.optionPressed,
                  ]}
                  onPress={() => handleSelectLanguage(option.value)}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: isActive }}
                >
                  <View style={styles.optionContent}>
                    <Text style={[styles.optionCode, { color: tokens.text.primary }]}>{option.abbr}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        { color: tokens.text.primary },
                        isActive && { color: themeColors?.primary || tokens.interactive.accent },
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
