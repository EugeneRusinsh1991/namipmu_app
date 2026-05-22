import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLanguage } from '../context/LanguageContext';
import { globalStyles } from '../styles/globalStyles';
import { getLocalized, getLocalizedAsset } from '../utils/i18n';
import AppButton from './AppButton';
import Card from './Card';
import ImageWithFallback from './ImageWithFallback';
import LanguageSwitcher from './LanguageSwitcher';
import ResponsiveImage from './ResponsiveImage';

export function HeroImageRenderer({ content, lang = 'ru' }) {
  const heroItem = content.find(item => item.type === 'heroImage');
  
  if (!heroItem) return null;

  const heroImageSrc = getLocalizedAsset(heroItem.image, lang);
  
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
        const text = getLocalized(item.text, lang, '');

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
            <LanguageSwitcher
              key={index}
              value={lang}
              onChange={(selected) => setLang(selected)}
            />
          );
        }

        if (item.type === 'navigationButtons') {
          const backText = getLocalized(item.backText, lang, 'Назад');
          const nextText = getLocalized(item.nextText, lang, '');
          const nextHref = item.href || '/';

          return (
            <View key={index} style={StyleSheet.flatten([styles.navigationRow, heroOverlapStyle])}>
              <Link href={item.backHref || '/'} asChild>
                <AppButton
                  title={backText}
                  variant="secondary"
                  accessibilityLabel={`Кнопка ${backText}`}
                  style={styles.navigationButton}
                />
              </Link>
              <Link href={nextHref} asChild>
                <AppButton
                  title={nextText}
                  variant="primary"
                  accessibilityLabel={`Кнопка ${nextText}`}
                  style={StyleSheet.flatten([
                    styles.navigationButton,
                    styles.primaryButton,
                  ])}
                />
              </Link>
            </View>
          );
        }

        if (item.type === 'list') {
          return (
            <View key={index} style={[globalStyles.listContainer, heroOverlapStyle]}>
              {item.items.map((listItem, itemIndex) => {
                const itemText = getLocalized(listItem.text, lang, '');

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
          const imageSrc = getLocalizedAsset(item.src, lang);

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
          const gifSrc = getLocalizedAsset(item.src, lang);

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
          const cardTitle = getLocalized(item.title, lang, '');

          const cardDescription = getLocalized(item.description, lang, '');

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

const styles = StyleSheet.create({
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  navigationButton: {
    flex: 1,
  },
  primaryButton: {
    marginLeft: 12,
  },
});
