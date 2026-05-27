import { LinearGradient } from 'expo-linear-gradient';
import React, { FC } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { getLocalizedAsset } from '../../utils/i18n';
import ImageWithFallback from '../ImageWithFallback';

/**
 * Props для HeroBlock
 */
interface HeroBlockProps {
  content: any[];
  lang?: string;
  heroOverlapStyle?: any;
}

/**
 * Проверяет, является ли источник валидным медиа файлом
 */
function isLikelyValidMedia(src: any): boolean {
  if (!src) return false;
  if (typeof src === 'number') return true;
  if (typeof src === 'object' && src.uri) {
    return /^(https?:|file:|data:)/i.test(String(src.uri)) || String(src.uri).includes('images/') || /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(String(src.uri));
  }
  if (typeof src === 'string') {
    const s = String(src).trim();
    return /^(https?:|file:|data:)/i.test(s) || s.includes('images/') || /\.(jpg|jpeg|png|gif|webp|mp4)$/i.test(s);
  }
  return false;
}

/**
 * Block компонент для hero изображения
 * Отображает полноширинное изображение с градиентом в начале контента
 */
export const HeroBlock: FC<HeroBlockProps> = ({ content, lang = 'ru' }) => {
  const heroItem = content.find(item => item.type === 'heroImage');
  
  if (!heroItem) return null;

  const { colors } = useTheme();
  const heroImageSrc = getLocalizedAsset(heroItem.image, lang);
  const safeHeroSrc = isLikelyValidMedia(heroImageSrc) ? heroImageSrc : require('../../../assets/images/error.jpg');
  
  const { width: windowWidth } = useWindowDimensions();

  const styles = StyleSheet.create({
    heroImage: {
      width: Platform.OS === 'web' ? '100vw' : windowWidth,
      height: Platform.select({
        web: 250 as any,
        default: 200,
      }),
      position: 'relative',
      marginBottom: Platform.select({
        web: -40 as any,
        default: -30,
      }),
      zIndex: 0,
      overflow: 'hidden' as any,
      alignSelf: 'center',
    },
    heroImageBackground: {
      position: 'absolute' as any,
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      width: '100%',
      height: '100%',
      resizeMode: 'cover' as any,
    },
    heroGradient: {
      position: 'absolute' as any,
      left: 0,
      right: 0,
      bottom: 0,
      height: Platform.select({
        web: 120 as any,
        default: 80,
      }),
    },
  });

  const wrapperStyle: any = {
    ...styles.heroImage,
    width: Platform.OS === 'web' ? '100vw' : windowWidth,
    alignSelf: 'center',
    position: 'relative',
    left: Platform.OS === 'web' ? 'calc(50% - 50vw)' : undefined,
  };

  const requestedHeight = Number(heroItem.height);
  if (Number.isFinite(requestedHeight)) {
    const styleHeight = styles.heroImage.height as number || undefined;
    wrapperStyle.height = styleHeight ? Math.min(requestedHeight, styleHeight) : requestedHeight;
  }

  return (
    <View style={wrapperStyle}>
      <ImageWithFallback
        source={safeHeroSrc}
        style={styles.heroImageBackground}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', colors.backgroundLight]}
        style={styles.heroGradient}
      />
    </View>
  );
};
