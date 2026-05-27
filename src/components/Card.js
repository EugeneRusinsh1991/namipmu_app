import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { CARD_SIZES } from '../styles/content-dimensions';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import ImageWithFallback from './ImageWithFallback';

/**
 * Card Component
 * 
 * Карточка с изображением, заголовком и описанием.
 * Поддерживает два размера: 'big' и 'small'.
 * Размеры берут из centralized content-dimensions.ts
 * 
 * Props:
 *   - image: локализированное изображение
 *   - title: локализированный заголовок
 *   - description: локализированное описание
 *   - href: ссылка для навигации
 *   - size: 'big' или 'small'
 *   - inGrid: если true, карточка используется в сетке
 *   - gap: промежуток между карточками в сетке
 */
export default function Card({ image, title, description, href, size = 'big', inGrid = false, gap }) {
  const { lang } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const { tokens, specs } = useDesignTokens(); // Перемещено сюда для использования в dynamicCardStyle

  // Compute available content width inside page container
  // Используем токены spacing для контейнера
  const containerPadding = tokens.spacing.lg; // 24px
  const maxContentWidth = 600;
  const availableWidth = windowWidth - containerPadding * 2;

  // Responsive width when inside a grid
  let gridCardWidth = null;
  if (inGrid) {
    const columns = windowWidth >= 768 ? 3 : 1;
    const gapSize = typeof gap === 'number' ? gap : spacing.md;
    const totalGap = gapSize * (columns - 1);
    gridCardWidth = Math.floor((Math.min(availableWidth, maxContentWidth) - totalGap) / columns);
  }

  // Вычисляем ширину для большой карточки
  const cardWidthBig = gridCardWidth || Math.min(availableWidth, maxContentWidth);

  // Получаем конфиг размеров из content-dimensions
  const sizeConfig = size === 'small' ? CARD_SIZES.small : CARD_SIZES.large;

  // Получаем картинку в зависимости от языка
  const imageSource = getLocalizedAsset(image, lang);

  // Динамические стили в зависимости от размера и темы
  const dynamicCardStyle = {
    ...styles.card,
    width: sizeConfig === CARD_SIZES.large ? cardWidthBig : 'auto',
    backgroundColor: specs.card[size].backgroundColor,
    borderRadius: specs.card[size].borderRadius,
    ...tokens.shadows.md, // Применяем полную тень из дизайн-системы
  };

  // Радиус изображения должен соответствовать радиусу карточки
  // или быть определен в specs.image.card.borderRadius
  const dynamicImageStyle = {
    ...styles.image,
    width: sizeConfig === CARD_SIZES.large ? cardWidthBig : sizeConfig.cardWidth,
    height: sizeConfig.imageHeight,
    borderRadius: specs.card[size].borderRadius,
  };

  const dynamicContentStyle = {
    ...styles.content,
    padding: sizeConfig === CARD_SIZES.large ? spacing.lg : spacing.md,
  };

  const dynamicTitleStyle = {
    ...styles.title,
    fontSize: sizeConfig.titleFontSize,
    marginBottom: sizeConfig.titleMarginBottom,
    color: tokens.textPrimary,
    fontWeight: '600',
  };

  const dynamicDescriptionStyle = {
    ...styles.description,
    fontSize: sizeConfig === CARD_SIZES.large ? 14 : 12,
    lineHeight: sizeConfig === CARD_SIZES.large ? 22 : 16,
    color: tokens.secondaryText,
  };

  const safeTitle = getLocalized(title, lang, '');
  const safeDescription = getLocalized(description, lang, '');
  const normalizedHref = typeof href === 'string' ? (href.startsWith('/') ? href : `/${href}`) : undefined;

  const cardInner = (
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
    // borderWidth: 1, // Удаляем жестко заданную границу
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
  },
  image: {
    resizeMode: 'cover',
  },
  content: {
    justifyContent: 'flex-start',
  },
  title: {
    fontFamily: 'serif',
  },
  description: {
    fontFamily: 'sans-serif',
  },
});
