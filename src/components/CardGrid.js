import React from 'react';
import { StyleSheet, View } from 'react-native';
import { spacing } from '../styles/theme';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import Card from './Card';

export default function CardGrid({ items = [], lang = 'ru', gap = spacing.md, heroOverlapStyle = {} }) {
  if (!items || items.length === 0) return null;

  return (
    <View style={[styles.container, { marginHorizontal: -Math.floor(gap / 2) }, heroOverlapStyle]}>
      {items.map((item, idx) => {
        const title = getLocalized(item.title, lang, '');
        const description = getLocalized(item.description, lang, '');
        const image = getLocalizedAsset(item.image, lang);
        const size = item.size || 'big';

        return (
          <View key={idx} style={{ paddingHorizontal: Math.floor(gap / 2), marginBottom: gap }}>
            <Card
              image={image}
              title={title}
              description={description}
              href={item.href}
              size={size}
              inGrid={true}
              gap={gap}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
});
