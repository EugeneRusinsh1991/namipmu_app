import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { colors, radius, spacing, typography } from '../styles/theme';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import ImageWithFallback from './ImageWithFallback';

export default function Card({ image, title, description, href, size = 'big' }) {
  const { lang } = useLanguage();

  // Конфигурация для разных размеров
  const sizeConfig = {
    big: {
      cardWidth: 320,
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
  };

  const dynamicImageStyle = {
    ...styles.image,
    width: config.cardWidth,
    height: config.imageHeight,
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
  };

  const dynamicDescriptionStyle = {
    ...styles.description,
    fontSize: config.descriptionFontSize,
    lineHeight: config.descriptionLineHeight,
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
    backgroundColor: colors.cardBackground,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.textPrimary,
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
    color: colors.textPrimary,
  },

  description: {
    color: colors.bodyText,
  },
});
