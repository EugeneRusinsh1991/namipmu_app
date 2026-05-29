import { useDesignTokens } from '@/hooks/useDesignTokens';
import React, { FC, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
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
  const { tokens, specs } = useDesignTokens();

  const styles = useMemo(
    () => ({
      container: {
        marginBottom: tokens.spacing.standard,
      },
      card: {
        borderRadius: specs.card.large.borderRadius,
        padding: specs.card.large.padding,
        marginVertical: tokens.spacing.standard,
        backgroundColor: tokens.surface.surfacePrimary,
        borderWidth: tokens.borders.widthStandard,
        borderColor: tokens.interactive.border,
        ...specs.card.large.shadow,
      },
      headerTitle: {
        ...tokens.typography.subheading,
        color: tokens.text.primary,
      },
      headerDescription: {
        ...tokens.typography.text,
        color: tokens.text.secondary,
        marginTop: tokens.spacing.standard,
      },
      progressLabel: {
        ...tokens.typography.text,
        marginBottom: tokens.spacing.standard,
        color: tokens.text.tertiary,
      },
      itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: specs.checklist.itemPadding,
        paddingHorizontal: specs.checklist.itemPadding,
        borderRadius: tokens.borders.radiusStandard,
        backgroundColor: specs.checklist.itemBgColor,
        borderWidth: 1,
        borderColor: specs.checklist.itemBorderColor,
        marginBottom: specs.checklist.itemMarginBottom,
      },
      itemRowChecked: {
        backgroundColor: tokens.interactive.accentLight,
        borderColor: tokens.interactive.accent,
      },
      checkbox: {
        width: specs.checklist.checkboxSize,
        height: specs.checklist.checkboxSize,
        borderRadius: specs.checklist.checkboxBorderRadius,
        borderWidth: specs.checklist.checkboxBorderWidth,
        borderColor: tokens.interactive.border,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: tokens.spacing.standard,
        backgroundColor: specs.checklist.itemBgColor,
      },
      checkboxChecked: {
        borderColor: tokens.interactive.accent,
        backgroundColor: tokens.interactive.accent,
      },
      checkmark: {
        ...tokens.typography.text,
        fontSize: 12,
        fontWeight: '500',
        fontFamily: 'sans-serif',
        color: tokens.interactive.accent,
      },
      itemText: {
        ...tokens.typography.text,
        flex: 1,
        color: tokens.text.primary,
      },
      itemTextChecked: {
        color: tokens.text.disabled,
        textDecorationLine: 'line-through',
      },
    }),
    [tokens, specs]
  );

  const handleToggle = (index: number) => {
    setCheckedItems(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const title = getLocalized(item.title, lang, 'Checklist');
  const description = getLocalized(item.description, lang, '');
  const doneCount = items.filter((_, index) => checkedItems[index]).length;

  return (
    <View style={[styles.card, heroOverlapStyle, styles.container]}>
      {title ? <ScaledText style={styles.headerTitle}>{title}</ScaledText> : null}
      {description ? <ScaledText style={styles.headerDescription}>{description}</ScaledText> : null}
      <ScaledText style={styles.progressLabel}>
        {`${doneCount} / ${items.length} ${lang === 'eng' ? 'done' : lang === 'ger' ? 'erledigt' : 'выполнено'}`}
      </ScaledText>
      {items.map((itemData, index) => {
        const itemText = getLocalized(itemData.text, lang, '');
        const checked = Boolean(checkedItems[index]);
        return (
          <Pressable
            key={String(index)}
            onPress={() => handleToggle(index)}
            style={[styles.itemRow, checked ? styles.itemRowChecked : null]}
            android_ripple={{ color: tokens.interactive.accentLight }}
          >
            <View style={[styles.checkbox, checked ? styles.checkboxChecked : null]}>
              {checked ? <ScaledText style={styles.checkmark}>✓</ScaledText> : null}
            </View>
            <ScaledText
              style={[
                styles.itemText,
                checked ? styles.itemTextChecked : null,
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
