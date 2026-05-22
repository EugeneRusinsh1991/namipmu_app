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
      cardWidth: 280,
      imageHeight: 100,
      contentHeight: 150,
      contentPadding: spacing.md,
      titleFontSize: 18,
      titleMarginBottom: 8,
      descriptionFontSize: typography.fontSizeSm,
      descriptionLineHeight: 20,
    },
    small: {
      cardWidth: 160,
      imageHeight: 80,
      contentHeight: 100,
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
    borderRadius: radius.lg,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: colors.cardBackground,
    elevation: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: colors.cardBackground,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  image: {
    resizeMode: 'cover',
  },

  content: {
    overflow: 'hidden',
  },

  title: {
    fontWeight: 'bold',
  },

  description: {},
});
