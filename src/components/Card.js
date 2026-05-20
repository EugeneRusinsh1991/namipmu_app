import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import ImageWithFallback from './ImageWithFallback';

export default function Card({ image, title, description, href, size = 'big' }) {
  const { lang } = useLanguage();

  // Конфигурация для разных размеров
  const sizeConfig = {
    big: {
      cardWidth: 280,
      imageHeight: 100,
      contentHeight: 150,
      contentPadding: 16,
      titleFontSize: 18,
      titleMarginBottom: 8,
      descriptionFontSize: 14,
      descriptionLineHeight: 20,
    },
    small: {
      cardWidth: 160,
      imageHeight: 80,
      contentHeight: 100,
      contentPadding: 12,
      titleFontSize: 14,
      titleMarginBottom: 6,
      descriptionFontSize: 12,
      descriptionLineHeight: 16,
    },
  };

  const config = sizeConfig[size] || sizeConfig.big;

  // Получаем картинку в зависимости от языка
  const getImage = () => {
    if (!image) return null;
    
    // Если это объект с ua/ru
    if (typeof image === 'object' && image !== null) {
      return image[lang] || image.ru || image.ua;
    }
    
    // Если это просто require() из старого формата
    return image;
  };

  const imageSource = getImage();

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

  const safeText = value => {
    if (value == null) return '';
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (typeof value === 'object' && value !== null) {
      if (typeof value[lang] === 'string') return value[lang];
      if (typeof value.ru === 'string') return value.ru;
      if (typeof value.ua === 'string') return value.ua;
    }
    return '';
  };

  const safeTitle = safeText(title);
  const safeDescription = safeText(description);

  const cardInner = (
    <Pressable
      style={dynamicCardStyle}
      accessibilityRole={normalizedHref ? 'link' : 'button'}
    >
      {imageSource && <ImageWithFallback source={imageSource} style={dynamicImageStyle} />}

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
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fce8da',
    elevation: 5,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#fce8da',
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
