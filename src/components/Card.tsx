import { Link } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextStyle, useWindowDimensions, View, ViewStyle } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useDesignTokens } from '../hooks/useDesignTokens';
import { CARD_SIZES } from '../styles/content-dimensions';
import { radius, spacing } from '../styles/theme';
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
  gap 
}: CardProps): ReactNode {
  const { lang } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const { tokens } = useDesignTokens();

  // Compute available content width inside page container
  // Используем токены spacing для контейнера
  const containerPadding: number = spacing.lg; // 24px
  const maxContentWidth: number = 600;
  const availableWidth: number = windowWidth - containerPadding * 2;

  // Responsive width when inside a grid
  let gridCardWidth: number | null = null;
  if (inGrid) {
    const columns: number = windowWidth >= 768 ? 3 : 1;
    const gapSize: number = typeof gap === 'number' ? gap : spacing.md;
    const totalGap: number = gapSize * (columns - 1);
    gridCardWidth = Math.floor((Math.min(availableWidth, maxContentWidth) - totalGap) / columns);
  }

  // Вычисляем ширину для большой карточки
  const cardWidthBig: number = gridCardWidth || Math.min(availableWidth, maxContentWidth);

  // Получаем конфиг размеров из content-dimensions
  const sizeConfig: CardSizeConfig = size === 'small' ? CARD_SIZES.small : CARD_SIZES.large;

  // Получаем картинку в зависимости от языка
  const imageSource = getLocalizedAsset(image, lang);

  // Динамические стили в зависимости от размера и темы
  const dynamicCardStyle: ViewStyle = {
    ...styles.card,
    width: sizeConfig === CARD_SIZES.large ? cardWidthBig : 'auto',
    backgroundColor: tokens.cardBackground,
    borderColor: tokens.border,
    shadowColor: tokens.textPrimary,
    borderRadius: radius.md,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  };

  const dynamicImageStyle: ViewStyle = {
    ...styles.image,
    width: sizeConfig === CARD_SIZES.large ? cardWidthBig : (sizeConfig as any).cardWidth,
    height: sizeConfig.imageHeight,
    borderRadius: radius.md,
  };

  const dynamicContentStyle: ViewStyle = {
    ...styles.content,
    padding: sizeConfig === CARD_SIZES.large ? spacing.lg : spacing.md,
  };

  const dynamicTitleStyle: TextStyle = {
    ...styles.title,
    fontSize: sizeConfig.titleFontSize,
    marginBottom: sizeConfig.titleMarginBottom,
    color: tokens.textPrimary,
    fontWeight: '600',
  };

  const dynamicDescriptionStyle: TextStyle = {
    ...styles.description,
    fontSize: sizeConfig === CARD_SIZES.large ? 14 : 12,
    lineHeight: sizeConfig === CARD_SIZES.large ? 22 : 16,
    color: tokens.secondaryText,
  };

  const safeTitle: string = getLocalized(title, lang, '');
  const safeDescription: string = getLocalized(description, lang, '');
  const normalizedHref: string | undefined = typeof href === 'string' ? (href.startsWith('/') ? href : `/${href}`) : undefined;

  const cardInner: ReactNode = (
    <Pressable
      style={dynamicCardStyle}
      accessibilityRole={normalizedHref ? 'link' : 'button'}
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

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 20,
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
});
