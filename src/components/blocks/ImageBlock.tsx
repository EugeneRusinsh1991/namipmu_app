import React, { FC } from 'react';
import { View } from 'react-native';
import { getLocalizedAsset } from '../../utils/i18n';
import ResponsiveImage from '../ResponsiveImage';

/**
 * Элемент контента медиа (изображение или GIF)
 */
interface MediaBlockItem {
  src: any;
  aspectRatio?: number;
  width?: number;
  height?: number;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  [key: string]: any;
}

/**
 * Props для MediaBlock
 */
interface MediaBlockProps {
  item: MediaBlockItem;
  lang: string;
  heroOverlapStyle?: any;
}

/**
 * Базовый компонент для отображения медиа элементов
 */
const MediaBlock: FC<MediaBlockProps> = ({ item, lang, heroOverlapStyle }) => {
  const source = getLocalizedAsset(item.src, lang);
  const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
  const maxWidth = isSquareImage ? null : item.width || null;

  return (
    <View style={heroOverlapStyle}>
      <ResponsiveImage
        source={source}
        aspectRatio={item.aspectRatio}
        minWidth={100}
        maxWidth={maxWidth}
        resizeMode={item.resizeMode || 'contain'}
      />
    </View>
  );
};

/**
 * Block компонент для отображения изображений
 */
export const ImageBlock: FC<MediaBlockProps> = (props) => {
  return <MediaBlock {...props} />;
};

/**
 * Block компонент для отображения GIF изображений
 */
export const GifBlock: FC<MediaBlockProps> = (props) => {
  return <MediaBlock {...props} />;
};
