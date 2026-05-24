import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

export function ChecklistBlock({ item, lang, heroOverlapStyle }) {
  const items = Array.isArray(item.items) ? item.items : [];
  const [checkedItems, setCheckedItems] = useState({});
  const { colors, typography, componentStyles } = useTheme();

  const handleToggle = index => {
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
      fontSize: 14,
      marginBottom: 12,
      color: colors.textTertiary,
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
      color: colors.success,
      fontSize: 14,
      lineHeight: 18,
    },
    itemText: {
      flex: 1,
      fontSize: 16,
      color: colors.bodyText,
    },
    itemTextChecked: {
      color: colors.textTertiary,
      textDecorationLine: 'line-through',
    },
  });

  return (
    <View style={[dynamicStyles.quizContainer, heroOverlapStyle, dynamicStyles.container]}>
      {title ? <ScaledText style={typography.title}>{title}</ScaledText> : null}
      {description ? <ScaledText style={typography.text}>{description}</ScaledText> : null}
      <ScaledText style={[typography.text, dynamicStyles.progressLabel]}>{`${doneCount} / ${items.length} ${lang === 'eng' ? 'done' : lang === 'ger' ? 'erledigt' : 'выполнено'}`}</ScaledText>
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
            <ScaledText style={[typography.text, dynamicStyles.itemText, checked ? dynamicStyles.itemTextChecked : null]}>{itemText}</ScaledText>
          </Pressable>
        );
      })}
    </View>
  );
}
