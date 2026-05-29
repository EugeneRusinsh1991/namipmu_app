import React, { FC, useMemo } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { useDesignTokens } from '../../hooks/useDesignTokens';
import { getLocalizedAsset } from '../../utils/i18n';
import ImageWithFallback from '../ImageWithFallback';

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
  const { tokens, specs } = useDesignTokens();
  const windowDimensions = useWindowDimensions();
  const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
  const maxWidth = isSquareImage ? null : item.width || null;

  const containerPadding = tokens.spacing.standard;
  const availableWidth = windowDimensions.width - containerPadding * 2;
  const maxContentWidth = tokens.layout.contentMaxWidth;
  const finalWidth = Math.min(availableWidth, maxContentWidth);

  const defaultHeight = item.height || specs.image.card.height;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        wrapper: {
          alignSelf: 'center',
          width: maxWidth || finalWidth,
          ...(item.aspectRatio
            ? { aspectRatio: item.aspectRatio }
            : { height: defaultHeight }),
          minHeight: defaultHeight,
          borderRadius: specs.image.card.borderRadius ?? tokens.borders.radiusStandard,
          overflow: 'hidden',
          backgroundColor: 'transparent',
          ...specs.image.card.shadow,
          marginVertical: tokens.spacing.standard,
        },
        image: {
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
        },
      }),
    [defaultHeight, item.aspectRatio, maxWidth, finalWidth, tokens.spacing.standard, specs]
  );

  return (
    <View style={heroOverlapStyle}>
      <View style={styles.wrapper}>
        <ImageWithFallback
          source={source}
          style={styles.image}
          aspectRatio={item.aspectRatio}
          resizeMode={(item.resizeMode as any) || 'cover'}
        />
      </View>
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

