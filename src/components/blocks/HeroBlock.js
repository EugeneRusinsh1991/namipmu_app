import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import { colors } from '../../styles/theme';
import { getLocalizedAsset } from '../../utils/i18n';
import ImageWithFallback from '../ImageWithFallback';

function isLikelyValidMedia(src) {
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

export function HeroBlock({ content, lang = 'ru' }) {
  const heroItem = content.find(item => item.type === 'heroImage');
  
  if (!heroItem) return null;

  const heroImageSrc = getLocalizedAsset(heroItem.image, lang);
  const safeHeroSrc = isLikelyValidMedia(heroImageSrc) ? heroImageSrc : require('../../../assets/images/error.jpg');
  
  return (
    <View style={globalStyles.heroImage}>
      <ImageWithFallback
        source={safeHeroSrc}
        style={globalStyles.heroImageBackground}
        width={heroItem.width}
        height={heroItem.height}
        aspectRatio={heroItem.aspectRatio}
        resizeMode={heroItem.resizeMode}
      />
      <LinearGradient
        colors={['transparent', colors.backgroundLight]}
        style={globalStyles.heroGradient}
      />
    </View>
  );
}
