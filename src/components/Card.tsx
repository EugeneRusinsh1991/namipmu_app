import { Link } from 'expo-router';
import React, { useMemo } from 'react';
import { ImageStyle, Pressable, StyleSheet, Text, TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useDesignTokens } from '../hooks/useDesignTokens';
import { CARD_SIZES } from '../styles/content-dimensions';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import ImageWithFallback from './ImageWithFallback';

/**
 * Локализированный объект - может содержать значения для разных языков
 */
interface LocalizedValue {
  [key: string]: string | number;
}

/**
 * Props для компонента Card
 */
interface CardProps {
  /** Локализированное изображение */
  image: LocalizedValue | string;
  
  /** Локализированный заголовок */
  title: LocalizedValue | string;
  
  /** Локализированное описание */
  description: LocalizedValue | string;
  
  /** Ссылка для навигации (опционально) */
  href?: string;
  
  /** Размер карточки: 'big' или 'small' */
  size?: 'big' | 'small';
  
  /** Используется ли карточка в сетке */
  inGrid?: boolean;
  
  /** Промежуток между карточками в сетке */
  gap?: number;

  /** Язык (опционально, приоритет над контекстом) */
  lang?: string;
}

/**
 * Интерфейс для конфигурации картинки (добавлен для избежания any)
 */
interface ImageSizeConfig {
  height: number;
  contentHeight: number;
}

/**
 * Тип для конфигурации размера карточки
 */
type CardSizeConfig = typeof CARD_SIZES.large | typeof CARD_SIZES.small;

/**
 * Card Component
 * 
 * Карточка с изображением, заголовком и описанием.
 * Поддерживает два размера: 'big' и 'small'.
 * Размеры берут из centralized content-dimensions.ts
 * 
 * @param props - CardProps
 * @returns JSX элемент карточки
 * 
 * @example
 * ```tsx
 * <Card
 *   image={{ ru: 'path/to/image.jpg', en: 'path/to/image_en.jpg' }}
 *   title={{ ru: 'Заголовок', en: 'Title' }}
 *   description={{ ru: 'Описание', en: 'Description' }}
 *   href="/details"
 *   size="big"
 * />
 * ```
 */
export default function Card({ 
  image, 
  title, 
  description, 
  href, 
  size = 'big', 
  inGrid = false, 
  gap,
  lang: propLang
}: CardProps): React.ReactElement {
  const { lang: contextLang } = useLanguage();
  const activeLang = propLang || contextLang || 'ru';
  const { width: windowWidth } = useWindowDimensions();
  const { tokens, specs } = useDesignTokens();
  const cardMode = size === 'big' ? 'large' : 'small';

  const styles = useMemo(
    () => StyleSheet.create({
      card: {
        overflow: 'hidden',
        marginBottom: tokens.spacing.standard,
        alignSelf: inGrid ? 'stretch' : 'center',
      } as ViewStyle,
      image: {
        resizeMode: 'cover',
      } as ImageStyle,
      content: {
        justifyContent: 'flex-start',
      } as ViewStyle,
      title: {
        fontFamily: 'serif',
      } as TextStyle,
      description: {
        fontFamily: 'sans-serif',
      } as TextStyle,
    }),
    [tokens, specs, inGrid]
  );

  const { cardWidth, sizeConfig } = useMemo(() => {
    const containerPadding = tokens.spacing.standard;
    const maxContentWidth = tokens.layout.contentMaxWidth;
    const availableWidth = windowWidth - containerPadding * 2;
    const finalSizeConfig = size === 'small' ? CARD_SIZES.small : CARD_SIZES.large;
    const finalWidth = Math.min(availableWidth, maxContentWidth);

    return {
      cardWidth: inGrid ? undefined : finalWidth,
      sizeConfig: finalSizeConfig,
    };
  }, [windowWidth, inGrid, size, tokens.spacing.standard, tokens.layout.contentMaxWidth]);

  const imageSource = getLocalizedAsset(image, activeLang);

  const dynamicCardStyle: ViewStyle = {
    ...styles.card,
    ...(typeof cardWidth === 'number' ? { width: cardWidth } : {}),
    backgroundColor: tokens.surface.surfacePrimary,
    borderColor: tokens.interactive.border,
    borderWidth: tokens.borders.widthStandard,
    borderRadius: specs.card[cardMode].borderRadius,
    ...specs.card[cardMode].shadow,
  };

  const dynamicImageStyle: ImageStyle = {
    ...styles.image,
    width: '100%',
    height: sizeConfig.imageHeight,
    borderRadius: specs.card[cardMode].borderRadius,
  };

  const dynamicContentStyle: ViewStyle = {
    ...styles.content,
    padding: specs.card[cardMode].padding,
  };

  const dynamicTitleStyle: TextStyle = {
    ...styles.title,
    fontSize: tokens.subheading.fontSize,
    fontWeight: tokens.subheading.fontWeight,
    lineHeight: tokens.subheading.lineHeight,
    fontFamily: tokens.subheading.fontFamily,
    marginBottom: sizeConfig.titleMarginBottom,
    color: tokens.text.primary,
  };

  const dynamicDescriptionStyle: TextStyle = {
    ...styles.description,
    fontSize: tokens.text.fontSize,
    fontWeight: tokens.text.fontWeight,
    lineHeight: tokens.text.lineHeight,
    fontFamily: tokens.text.fontFamily,
    color: tokens.text.tertiary,
  };

  const safeTitle = getLocalized(title, activeLang, '');
  const safeDescription = getLocalized(description, activeLang, '');
  const normalizedHref: any = typeof href === 'string' ? (href.startsWith('/') ? href : `/${href}`) : undefined;

  const cardInner = (
    <Pressable
      style={dynamicCardStyle}
      accessibilityRole={normalizedHref ? 'link' : 'button'}
      accessibilityLabel={safeTitle}
    >
      <ImageWithFallback source={imageSource} style={dynamicImageStyle} />
      <View style={dynamicContentStyle}>
        <Text style={dynamicTitleStyle} numberOfLines={2}>{safeTitle}</Text>
        {safeDescription && (
          <Text style={dynamicDescriptionStyle} numberOfLines={3}>{safeDescription}</Text>
        )}
      </View>
    </Pressable>
  );

  if (normalizedHref) {
    return (
      <Link href={normalizedHref} asChild>
        {cardInner}
      </Link>
    );
  }

  return cardInner;
}
