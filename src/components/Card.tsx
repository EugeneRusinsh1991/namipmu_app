import { Link } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';
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
}: CardProps): JSX.Element {
  const { lang: contextLang } = useLanguage();
  const activeLang = propLang || contextLang || 'ru';
  const { width: windowWidth } = useWindowDimensions();
  const { tokens, specs } = useDesignTokens();
  const cardMode = size === 'big' ? 'large' : 'small';

  const styles = useMemo(
    () => StyleSheet.create({
      card: {
        overflow: 'hidden',
        marginBottom: tokens.spacing.lg,
        alignSelf: 'center',
      } as ViewStyle,
      image: {
        resizeMode: 'cover',
      } as ViewStyle,
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
    [tokens, specs]
  );

  const { cardWidth, sizeConfig } = useMemo(() => {
    const containerPadding = tokens.spacing.lg;
    const maxContentWidth = 600;
    const availableWidth = windowWidth - containerPadding * 2;
    
    let gridWidth: number | null = null;
    if (inGrid) {
      const columns = windowWidth >= 768 ? 3 : 1;
      const gapSize = typeof gap === 'number' ? gap : tokens.spacing.md;
      const totalGap = gapSize * (columns - 1);
      gridWidth = Math.floor((Math.min(availableWidth, maxContentWidth) - totalGap) / columns);
    }

    const finalSizeConfig = size === 'small' ? CARD_SIZES.small : CARD_SIZES.large;
    const finalWidth = gridWidth || Math.min(availableWidth, maxContentWidth);

    return {
      cardWidth: size === 'small' ? 'auto' : finalWidth,
      sizeConfig: finalSizeConfig,
    };
  }, [windowWidth, inGrid, gap, size, tokens.spacing.lg]);

  const imageSource = getLocalizedAsset(image, activeLang);

  const dynamicCardStyle: ViewStyle = {
    ...styles.card,
    width: cardWidth as any,
    backgroundColor: tokens.surface.surfacePrimary,
    borderColor: tokens.interactive.border,
    borderWidth: tokens.borders.widthBase,
    borderRadius: specs.card[cardMode].borderRadius,
    shadowColor: tokens.text.primary,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: specs.card[cardMode].shadowElevation,
  };

  const dynamicImageStyle: ViewStyle = {
    ...styles.image,
    width: size === 'big' ? (cardWidth as number) : sizeConfig.cardWidth,
    height: sizeConfig.imageHeight,
    borderRadius: specs.card[cardMode].borderRadius,
  };

  const dynamicContentStyle: ViewStyle = {
    ...styles.content,
    padding: specs.card[cardMode].padding,
  };

  const dynamicTitleStyle: TextStyle = {
    ...styles.title,
    fontSize: sizeConfig.titleFontSize,
    marginBottom: sizeConfig.titleMarginBottom,
    color: tokens.text.primary,
    fontWeight: tokens.typography.fontWeightSemibold,
  };

  const dynamicDescriptionStyle: TextStyle = {
    ...styles.description,
    fontSize: sizeConfig === CARD_SIZES.large ? tokens.typography.fontSizeSm : tokens.typography.fontSizeXs,
    lineHeight: sizeConfig === CARD_SIZES.large ? 22 : 16,
    color: tokens.text.tertiary,
  };

  const safeTitle = getLocalized(title, activeLang, '');
  const safeDescription = getLocalized(description, activeLang, '');
  const normalizedHref: string | undefined = typeof href === 'string' ? (href.startsWith('/') ? href : `/${href}`) : undefined;

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
