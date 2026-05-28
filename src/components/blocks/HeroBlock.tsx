import { useDesignTokens } from '@/hooks/useDesignTokens';
import { LinearGradient } from 'expo-linear-gradient';
import React, { FC, useMemo } from 'react';
import { Platform, StyleSheet, View, useWindowDimensions, type ImageStyle, type ViewStyle } from 'react-native';
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
 * Block компонент для hero изображения
 * Отображает полноширинное изображение с градиентом в начале контента
 */
export const HeroBlock: FC<HeroBlockProps> = ({ content, lang = 'ru' }) => {
  const heroItem = content.find(item => item.type === 'heroImage');
  
  if (!heroItem) return null;

  const { tokens, specs } = useDesignTokens();
  const heroImageSrc = getLocalizedAsset(heroItem.image, lang);

  const { width: windowWidth } = useWindowDimensions();

  type HeroStyles = {
    heroImage: ViewStyle;
    heroImageBackground: ImageStyle;
    heroGradient: ViewStyle;
  };

  const styles = useMemo(() => {
    const heroHeight = (specs.image.hero as any).height;
    const heroMarginBottom = (specs.image.hero as any).marginBottom || 0;
    const gradientHeight = (specs.image.hero as any).gradientHeight ?? Math.round((heroHeight || 200) * 0.4);

    return StyleSheet.create<HeroStyles>({
      heroImage: {
        width: Platform.OS === 'web' ? ('100vw' as unknown as number) : windowWidth,
        height: heroHeight,
        position: 'relative',
        marginBottom: heroMarginBottom,
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
        height: gradientHeight,
      },
    });
  }, [tokens, specs, windowWidth]);

  const wrapperStyle: any = useMemo(() => ({
    ...styles.heroImage,
    width: Platform.OS === 'web' ? '100vw' : windowWidth,
    alignSelf: 'center',
    position: 'relative',
    left: Platform.OS === 'web' ? 'calc(50% - 50vw)' : undefined,
  }), [styles, windowWidth]);

  const requestedHeight = Number(heroItem.height);
  if (Number.isFinite(requestedHeight)) {
    const styleHeight = styles.heroImage.height as number || undefined;
    wrapperStyle.height = styleHeight ? Math.min(requestedHeight, styleHeight) : requestedHeight;
  }

  return (
    <View style={wrapperStyle}>
      <ImageWithFallback
        source={heroImageSrc}
        style={styles.heroImageBackground}
        resizeMode="cover"
      />
      <LinearGradient
        colors={['transparent', tokens.surface.surfaceSecondary]}
        style={styles.heroGradient}
      />
    </View>
  );
};
