import React, { FC, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

/**
 * Props для ChecklistBlock
 */
interface ChecklistBlockProps {
  item: {
    title?: string | { [key: string]: string };
    description?: string | { [key: string]: string };
    items: Array<{
      text: string | { [key: string]: string };
      [key: string]: any;
    }>;
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для интерактивного чек-листа
 */
export const ChecklistBlock: FC<ChecklistBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  const items = Array.isArray(item.items) ? item.items : [];
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const { colors, typography } = useTheme();
  const { tokens } = useDesignTokens();

  const handleToggle = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const title = getLocalized(item.title, lang, 'Checklist');
  const description = getLocalized(item.description, lang, '');
  const doneCount = items.filter((_, index) => checkedItems[index]).length;

  const dynamicStyles = StyleSheet.create({
    container: {
      marginBottom: 16,
    },
    quizContainer: {
      borderRadius: 16,
      padding: 16,
      marginVertical: 12,
      backgroundColor: colors.cardBackground,
      borderWidth: 1,
      borderColor: colors.cardBorder,
    },
    progressLabel: {
      fontSize: tokens.typography.fontSizeSm,
      marginBottom: 12,
      color: tokens.text.tertiary,
    },
    itemRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 14,
      paddingHorizontal: 14,
      borderRadius: 16,
      backgroundColor: colors.surfaceDefault,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      marginBottom: 10,
    },
    itemRowChecked: {
      backgroundColor: colors.accentLight,
      borderColor: colors.accent,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 6,
      borderWidth: 1,
      borderColor: colors.cardBorder,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
      backgroundColor: colors.surfaceDefault,
    },
    checkboxChecked: {
      borderColor: colors.success,
      backgroundColor: colors.success,
      opacity: 0.2,
    },
    checkmark: {
      color: tokens.text.success,
      fontSize: tokens.typography.fontSizeSm,
      lineHeight: 18,
    },
    itemText: {
      flex: 1,
      fontSize: tokens.typography.fontSizeMd,
      color: tokens.text.secondary,
    },
    itemTextChecked: {
      color: tokens.text.tertiary,
      textDecorationLine: 'line-through',
    },
  });

  return (
    <View style={[dynamicStyles.quizContainer, heroOverlapStyle, dynamicStyles.container]}>
      {title ? <ScaledText style={typography.title}>{title}</ScaledText> : null}
      {description ? <ScaledText style={typography.text}>{description}</ScaledText> : null}
      <ScaledText style={[typography.text, dynamicStyles.progressLabel]}>
        {`${doneCount} / ${items.length} ${lang === 'eng' ? 'done' : lang === 'ger' ? 'erledigt' : 'выполнено'}`}
      </ScaledText>
      {items.map((itemData, index) => {
        const itemText = getLocalized(itemData.text, lang, '');
        const checked = Boolean(checkedItems[index]);
        return (
          <Pressable
            key={String(index)}
            onPress={() => handleToggle(index)}
            style={[dynamicStyles.itemRow, checked ? dynamicStyles.itemRowChecked : null]}
            android_ripple={{ color: colors.accentLight }}
          >
            <View style={[dynamicStyles.checkbox, checked ? dynamicStyles.checkboxChecked : null]}>
              {checked ? <ScaledText style={dynamicStyles.checkmark}>✓</ScaledText> : null}
            </View>
            <ScaledText 
              style={[
                typography.text, 
                dynamicStyles.itemText, 
                checked ? dynamicStyles.itemTextChecked : null
              ]}
            >
              {itemText}
            </ScaledText>
          </Pressable>
        );
      })}
    </View>
  );
};
