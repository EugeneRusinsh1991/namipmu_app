import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLanguage } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';
import Card from './Card';
import ImageWithFallback from './ImageWithFallback';
import ResponsiveImage from './ResponsiveImage';

export function HeroImageRenderer({ content, lang = 'ru' }) {
  const heroItem = content.find(item => item.type === 'heroImage');
  
  if (!heroItem) return null;

  const heroImageSrc = typeof heroItem.image === 'object' && heroItem.image !== null
    ? heroItem.image[lang] || heroItem.image.ru || heroItem.image.ua
    : heroItem.image;
  
  return (
    <View style={globalStyles.heroImage}>
      <ImageWithFallback
        source={heroImageSrc}
        style={globalStyles.heroImageBackground}
        width={heroItem.width}
        height={heroItem.height}
        aspectRatio={heroItem.aspectRatio}
        resizeMode={heroItem.resizeMode}
      />
      <LinearGradient
        colors={['transparent', '#fff3eb']}
        style={globalStyles.heroGradient}
      />
    </View>
  );
}

export default function ContentRenderer({ content, lang = 'ru' }) {
  const { setLang } = useLanguage();
  
  // Фильтруем контент - исключаем heroImage
  const filteredContent = content.filter(item => item.type !== 'heroImage');
  let hadHeroImage = content.some(item => item.type === 'heroImage');

  return (
    <>
      {filteredContent.map((item, index) => {
        const text =
          typeof item.text === 'object' && item.text !== null
            ? item.text[lang] || item.text.ru || item.text.ua || ''
            : item.text;

        // Если это первый элемент и была heroImage, применяем наложение
        const isFirstAfterHero = index === 0 && hadHeroImage;
        const heroOverlapStyle = isFirstAfterHero ? { marginTop: -50 } : {};

        if (item.type === 'title') {
          return (
            <Text key={index} style={[globalStyles.title, heroOverlapStyle]}>
              {text}
            </Text>
          );
        }

        if (item.type === 'eyebrow') {
          return (
            <Text key={index} style={[globalStyles.eyebrow, heroOverlapStyle]}>
              {text}
            </Text>
          );
        }

        if (item.type === 'subtitle') {
          return (
            <Text key={index} style={[globalStyles.subtitle, heroOverlapStyle]}>
              {text}
            </Text>
          );
        }

        if (item.type === 'languageSwitcher') {
          return (
            <View key={index} style={globalStyles.langWrap}>
              <TouchableOpacity
                onPress={() => setLang('ua')}
                style={[globalStyles.langBtn, lang === 'ua' && globalStyles.langBtnActive]}
              >
                <Text style={[globalStyles.langText, lang === 'ua' && globalStyles.langTextActive]}>
                  Українська
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setLang('ru')}
                style={[globalStyles.langBtn, lang === 'ru' && globalStyles.langBtnActive]}
              >
                <Text style={[globalStyles.langText, lang === 'ru' && globalStyles.langTextActive]}>
                  Русский
                </Text>
              </TouchableOpacity>
            </View>
          );
        }

        if (item.type === 'list') {
          return (
            <View key={index} style={[globalStyles.listContainer, heroOverlapStyle]}>
              {item.items.map((listItem, itemIndex) => {
                const itemText =
                  typeof listItem.text === 'object' && listItem.text !== null
                    ? listItem.text[lang] || listItem.text.ru || listItem.text.ua || ''
                    : listItem.text;

                return (
                  <View key={itemIndex} style={globalStyles.listItem}>
                    <Text style={globalStyles.listBullet}>•</Text>
                    <Text style={globalStyles.listItemText}>{itemText}</Text>
                  </View>
                );
              })}
            </View>
          );
        }

        if (item.type === 'text') {
          return (
            <Text key={index} style={[globalStyles.text, heroOverlapStyle]}>
              {text}
            </Text>
          );
        }

        if (item.type === 'image') {
          const imageSrc = typeof item.src === 'object' && item.src !== null
            ? item.src[lang] || item.src.ru || item.src.ua
            : item.src;

          const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
          const imageMaxWidth = isSquareImage ? null : item.width || null;
          
          return (
            <View key={index} style={heroOverlapStyle}>
              <ResponsiveImage
                source={imageSrc}
                aspectRatio={item.aspectRatio}
                minWidth={100}
                maxWidth={imageMaxWidth}
                padding={16}
                resizeMode={item.resizeMode || 'contain'}
              />
            </View>
          );
        }

        if (item.type === 'gif') {
          const gifSrc = typeof item.src === 'object' && item.src !== null
            ? item.src[lang] || item.src.ru || item.src.ua
            : item.src;

          const isSquareImage = item.aspectRatio === 1 && item.width === item.height;
          const gifMaxWidth = isSquareImage ? null : item.width || null;
          
          return (
            <View key={index} style={heroOverlapStyle}>
              <ResponsiveImage
                source={gifSrc}
                aspectRatio={item.aspectRatio}
                minWidth={100}
                maxWidth={gifMaxWidth}
                padding={16}
                resizeMode={item.resizeMode || 'contain'}
              />
            </View>
          );
        }

        if (item.type === 'video' && item.url) {
          return (
            <View key={index} style={[globalStyles.videoContainer, heroOverlapStyle]}>
              <WebView style={{ flex: 1 }} source={{ uri: item.url }} />
            </View>
          );
        }

        if (item.type === 'link' && item.href) {
          const normalizedHref = typeof item.href === 'string' ? (item.href.startsWith('/') ? item.href : `/${item.href}`) : item.href;

          return (
            <Link key={index} href={normalizedHref} style={heroOverlapStyle}>
              <Text style={globalStyles.textLink}>{text}</Text>
            </Link>
          );
        }

        if (item.type === 'card' || item.type === 'cardBig' || item.type === 'cardSmall') {
          const cardTitle =
            typeof item.title === 'object' && item.title !== null
              ? item.title[lang] || item.title.ru || item.title.ua || ''
              : item.title;
          
          const cardDescription =
            typeof item.description === 'object' && item.description !== null
              ? item.description[lang] || item.description.ru || item.description.ua || ''
              : item.description;

          // Определяем размер карточки
          const cardSize = item.type === 'cardSmall' ? 'small' : 'big';

          return (
            <View key={index} style={heroOverlapStyle}>
              <Card
                image={item.image}
                title={cardTitle}
                description={cardDescription}
                href={item.href}
                size={cardSize}
              />
            </View>
          );
        }

        return null;
      })}
    </>
  );
}