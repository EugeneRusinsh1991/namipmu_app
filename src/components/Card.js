import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { layout, radius, spacing, typography } from '../styles/theme';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import ImageWithFallback from './ImageWithFallback';
const componentDefaults = require('../styles/componentDefaults').componentStyles;

export default function Card({ image, title, description, href, size = 'big', inGrid = false, gap }) {
  const { lang } = useLanguage();
  const { width: windowWidth } = useWindowDimensions();
  const { colors: themeColors, componentStyles } = useTheme();

  // Compute available content width inside page container
  const availableWidth = windowWidth - layout.containerPadding * 2;
  const maxContent = layout.maxContentWidth || 600;

  // Responsive width when inside a grid
  let gridCardWidth = null;
  if (inGrid) {
    const columns = windowWidth >= 768 ? 3 : 1;
    const gapSize = typeof gap === 'number' ? gap : spacing.md;
    const totalGap = gapSize * (columns - 1);
    gridCardWidth = Math.floor((Math.min(availableWidth, maxContent) - totalGap) / columns);
  }

  // Вычисляем ширину для большой карточки, чтобы она совпадала с шириной контента
  const cardWidthBig = gridCardWidth || Math.min(availableWidth, maxContent);

  // Конфигурация для разных размеров
  const sizeConfig = {
    big: {
      cardWidth: cardWidthBig,
      imageHeight: 150,
      contentHeight: 110,
      contentPadding: spacing.lg,
      titleFontSize: 20,
      titleMarginBottom: 10,
      descriptionFontSize: typography.fontSizeSm,
      descriptionLineHeight: 22,
    },
    small: {
      cardWidth: 190,
      imageHeight: 110,
      contentHeight: 70,
      contentPadding: spacing.sm,
      titleFontSize: 14,
      titleMarginBottom: 6,
      descriptionFontSize: typography.fontSizeSm,
      descriptionLineHeight: 16,
    },
  };

  const config = sizeConfig[size] || sizeConfig.big;

  // Получаем картинку в зависимости от языка
  const imageSource = getLocalizedAsset(image, lang);

  // Динамические стили в зависимости от размера
  const dynamicCardStyle = {
    ...styles.card,
    width: config.cardWidth,
    backgroundColor: themeColors.cardBackground,
    borderColor: themeColors.border,
    shadowColor: themeColors.textPrimary,
  };

  const dynamicImageStyle = {
    ...styles.image,
    width: config.cardWidth,
    height: config.imageHeight,
    borderRadius: componentStyles?.image?.borderRadius,
  };

  const dynamicContentStyle = {
    ...styles.content,
    padding: config.contentPadding,
    height: config.contentHeight,
  };

  const dynamicTitleStyle = {
    ...styles.title,
    fontSize: config.titleFontSize,
    marginBottom: config.titleMarginBottom,
    color: themeColors.textPrimary,
  };

  const dynamicDescriptionStyle = {
    ...styles.description,
    fontSize: config.descriptionFontSize,
    lineHeight: config.descriptionLineHeight,
    color: themeColors.bodyText,
  };

  const normalizedHref = typeof href === 'string' ? (href.startsWith('/') ? href : `/${href}`) : undefined;

  const safeTitle = getLocalized(title, lang, '');
  const safeDescription = getLocalized(description, lang, '');

  const cardInner = (
    <Pressable
      style={dynamicCardStyle}
      accessibilityRole={normalizedHref ? 'link' : 'button'}
    >
      <ImageWithFallback source={imageSource} style={dynamicImageStyle} />

      <View style={dynamicContentStyle}>
        <Text style={dynamicTitleStyle}>{safeTitle}</Text>
        {safeDescription !== '' && <Text style={dynamicDescriptionStyle}>{safeDescription}</Text>}
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
    borderRadius: radius.md,
    overflow: 'hidden',
    marginBottom: 20,
    alignSelf: 'center',
    borderWidth: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
  },

  image: {
    resizeMode: 'cover',
  },

  content: {
    overflow: 'hidden',
  },

  title: {
    fontWeight: '600',
  },

  description: {
  },
});
