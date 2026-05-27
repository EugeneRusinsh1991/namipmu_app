import React, { FC } from 'react';
import { View } from 'react-native';
import { getLocalized } from '../../utils/i18n';
import Card from '../Card';

/**
 * Элемент контента карточки
 */
interface CardBlockItem {
  title: string | { [key: string]: string };
  description: string | { [key: string]: string };
  image: any;
  href?: string;
  size?: 'big' | 'small';
  type?: string;
  [key: string]: any;
}

/**
 * Props для CardBlock
 */
interface CardBlockProps {
  item: CardBlockItem;
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Block компонент для отображения карточки
 */
export const CardBlock: FC<CardBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  const cardTitle = getLocalized(item.title, lang, '');
  const cardDescription = getLocalized(item.description, lang, '');
  const cardSize = item.size || (item.type === 'cardSmall' ? 'small' : 'big');

  return (
    <View style={heroOverlapStyle}>
      <Card
        image={item.image}
        title={cardTitle}
        description={cardDescription}
        href={item.href}
        size={cardSize}
      />
    </View>
  );
};
