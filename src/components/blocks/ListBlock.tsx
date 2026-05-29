import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalized } from '../../utils/i18n';
import ScaledText from '../ScaledText';

/**
 * Элемент списка
 */
interface ListItem {
  text?: string | { [key: string]: string };
  [key: string]: any;
}

/**
 * Props для ListBlock
 */
interface ListBlockProps {
  item: {
    items: ListItem[];
    [key: string]: any;
  };
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для маркированного списка
 */
export const ListBlock: FC<ListBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  if (!item || !Array.isArray(item.items) || item.items.length === 0) return null;

  const { tokens, specs } = useDesignTokens();
  const styles = StyleSheet.create({
    listContainer: {
      marginVertical: tokens.spacing.standard,
    },
    card: {
      borderRadius: specs.card.large.borderRadius,
      padding: specs.card.large.padding,
      backgroundColor: tokens.surface.surfacePrimary,
      borderWidth: tokens.borders.widthStandard,
      borderColor: tokens.interactive.border,
      marginVertical: tokens.spacing.standard,
      ...specs.card.large.shadow,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: tokens.spacing.standard,
    },
    listBullet: {
      ...tokens.typography.text,
      fontSize: tokens.typography.text.fontSize,
      fontWeight: tokens.typography.text.fontWeight,
      lineHeight: tokens.typography.text.lineHeight,
      marginRight: tokens.spacing.standard,
      color: tokens.interactive.accent,
    },
    listItemText: {
      ...tokens.typography.text,
      flex: 1,
      color: tokens.text.primary,
    },
  });

  return (
    <View style={[styles.card, styles.listContainer, heroOverlapStyle]}>
      {item.items.map((listItem, itemIndex) => {
        const maybeText = (listItem as any)?.text ?? listItem;
        const itemText = getLocalized(maybeText, lang, '');

        return (
          <View key={String(itemIndex)} style={styles.listItem}>
            <ScaledText style={styles.listBullet}>•</ScaledText>
            <ScaledText style={styles.listItemText}>{itemText}</ScaledText>
          </View>
        );
      })}
    </View>
  );
};
