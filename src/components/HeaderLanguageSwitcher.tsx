import React, { useState } from 'react';
import {
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { useLanguage } from '../context/LanguageContext';
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
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = LANGUAGE_OPTIONS.find((opt) => opt.value === lang);
  const currentAbbr = currentLanguage?.abbr || 'UA';

  const handleSelectLanguage = (value: string) => {
    setLang(value);
    setIsOpen(false);
  };

  return (
    <>
      {/* Button positioned absolute inside page */}
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => setIsOpen(!isOpen)}
        accessibilityRole="button"
        accessibilityLabel={`Язык: ${currentLanguage?.label}`}
      >
        <Text style={styles.buttonText}>{currentAbbr}</Text>
        <Text style={styles.arrow}>▼</Text>
      </Pressable>

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
                    isActive && styles.optionActive,
                    pressed && styles.optionPressed,
                  ]}
                  onPress={() => handleSelectLanguage(option.value)}
                  accessibilityRole="menuitem"
                  accessibilityState={{ selected: isActive }}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionCode}>{option.abbr}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        isActive && styles.optionTextActive,
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
    position: 'absolute',
    top: 30,              // 👈 ОТСТУП СВЕРХУ - меняй тут
    right: 30,            // 👈 ОТСТУП СПРАВА - меняй тут
    zIndex: 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.md,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPressed: {
    opacity: 0.7,
    backgroundColor: colors.cardBackground,
  },
  buttonText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  arrow: {
    color: colors.textPrimary,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
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
});
