import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
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

  const { colors } = useTheme();
  const styles = StyleSheet.create({
    listContainer: {
      marginVertical: 12,
    },
    listItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 8,
    },
    listBullet: {
      marginRight: 8,
      color: colors.accent,
      fontSize: 16,
    },
    listItemText: {
      flex: 1,
      color: colors.bodyText,
      fontSize: 16,
    },
  });

  return (
    <View style={[styles.listContainer, heroOverlapStyle]}>
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
