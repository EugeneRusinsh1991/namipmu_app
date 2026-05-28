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
  const { tokens } = useDesignTokens();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGE_OPTIONS.find((opt) => opt.value === lang);
  const currentAbbr = currentLanguage?.abbr || 'UA';

  // dynamic styles derived from theme colors
  const dynamicButtonStyle = {
    backgroundColor: themeColors?.white || tokens.white,
    borderColor: themeColors?.interactive?.border || tokens.interactive.border,
  };

  const dynamicDropdownStyle = {
    backgroundColor: themeColors?.white || tokens.white,
    borderColor: themeColors?.interactive?.border || tokens.interactive.border,
  };

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
      paddingHorizontal: tokens.spacing.md,
      paddingVertical: tokens.spacing.xs,
      borderRadius: tokens.borders.radiusMd,
      borderWidth: tokens.borders.widthBase,
      ...tokens.shadows.sm,
    },
    buttonPressed: {
      opacity: 0.7,
    },
    buttonText: {
      fontSize: tokens.typography.fontSizeSm,
    },
    arrow: {
      fontSize: tokens.typography.fontSizeXs,
      marginLeft: 2,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.3)',
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 80,
      paddingRight: tokens.spacing.md,
    },
    dropdownContainer: {
      backgroundColor: tokens.white,
      borderRadius: tokens.borders.radiusMd,
      overflow: 'hidden',
      minWidth: 180,
      ...tokens.shadows.md,
      borderWidth: tokens.borders.widthBase,
      borderColor: tokens.interactive.border,
    },
    option: {
      paddingVertical: tokens.spacing.sm,
      paddingHorizontal: tokens.spacing.md,
      borderBottomWidth: tokens.borders.widthThin,
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
      gap: tokens.spacing.md,
    },
    optionCode: {
      fontSize: tokens.typography.fontSizeXs,
      minWidth: 30,
    },
    optionText: {
      fontSize: tokens.typography.fontSizeMd,
    },
    optionTextActive: {
      color: tokens.interactive.accent,
    },
    iconButton: {
      padding: tokens.spacing.xs,
      borderRadius: tokens.borders.radiusFull,
      backgroundColor: tokens.white,
      borderWidth: tokens.borders.widthBase,
      borderColor: tokens.interactive.border,
    },
  }), [tokens]);

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
          style={({ pressed }) => [styles.iconButton, { backgroundColor: themeColors?.white || tokens.white }, pressed && { opacity: 0.7 }]}
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
          <View style={[styles.dropdownContainer, dynamicDropdownStyle]}>
            {LANGUAGE_OPTIONS.map((option) => {
              const isActive = option.value === lang;
              return (
                <Pressable
                  key={option.value}
                  style={({ pressed }) => [
                    styles.option,
                    isActive && { backgroundColor: themeColors?.cardBackground || tokens.surface.surfaceSecondary },
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
